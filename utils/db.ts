import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

let dbInstance: Database | null = null;
let sqlInstance: SqlJsStatic | null = null;

export interface DBResult {
  code: string;
  isExtended: boolean;
}

/**
 * Initialize the SQLite engine.
 * 1. Tries to load 'cangjie.db' (pre-compiled).
 * 2. If missing, falls back to fetching JSONs and building DB in memory.
 */
export const initDB = async (dbUrl: string): Promise<void> => {
  if (dbInstance) return;

  try {
    // 1. Load WASM manually
    // This explicitly fetches the WASM binary via HTTP, bypassing sql.js's internal
    // environment detection which mistakenly tries to use 'fs' (Node.js file system)
    // in StackBlitz/WebContainers.
    const wasmUrl = 'https://esm.sh/sql.js@1.13.0/dist/sql-wasm.wasm';
    console.log(`Loading SQL.js WASM from ${wasmUrl}...`);
    
    const wasmRes = await fetch(wasmUrl);
    if (!wasmRes.ok) {
        throw new Error(`Failed to load WASM: ${wasmRes.statusText}`);
    }
    const wasmBinary = await wasmRes.arrayBuffer();

    // Initialize with the manually fetched binary
    sqlInstance = await initSqlJs({
      wasmBinary
    });

    // 2. Try to fetch the pre-built database file (Optional optimization)
    console.log(`Attempting to load DB from ${dbUrl}...`);
    let loadedFromFile = false;
    try {
      const response = await fetch(dbUrl);
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        dbInstance = new sqlInstance.Database(new Uint8Array(buffer));
        console.log("SQLite Database loaded from file successfully.");
        loadedFromFile = true;
      }
    } catch (e) {
      console.warn("Could not load .db file, will fall back to in-memory generation.", e);
    }

    if (loadedFromFile) return;

    // 3. Fallback: Generate DB in-memory from JSON files
    // This allows the app to work immediately without running the local Node.js script.
    console.log("Generating Database in-memory from JSONs...");
    await createDbFromJsons(sqlInstance);
    console.log("In-memory Database generated successfully.");

  } catch (err) {
    console.error("Failed to initialize SQLite:", err);
    throw err;
  }
};

/**
 * Helper to build the database on the fly in the browser
 */
async function createDbFromJsons(SQL: SqlJsStatic) {
  const db = new SQL.Database();
  
  // Create Table
  db.run("CREATE TABLE dictionary (char TEXT PRIMARY KEY, code TEXT, is_extended INTEGER);");
  db.run("CREATE INDEX idx_char ON dictionary (char);");

  const stmt = db.prepare("INSERT OR IGNORE INTO dictionary VALUES (?, ?, ?)");

  // Load Core Dictionary
  try {
    const coreRes = await fetch('cangjie-dictionary.json');
    if (coreRes.ok) {
      const coreData = await coreRes.json() as Record<string, string>;
      db.exec("BEGIN TRANSACTION");
      for (const [char, code] of Object.entries(coreData)) {
         stmt.run([char, code, 0]);
      }
      db.exec("COMMIT");
    } else {
        console.error("Could not fetch core dictionary JSON");
    }
  } catch(e) { console.error("Error loading core dictionary:", e); }

  // Load Extended Dictionary
  try {
    const extRes = await fetch('cangjie-dictionary-extended.json');
    if (extRes.ok) {
      const extData = await extRes.json() as Record<string, string>;
      db.exec("BEGIN TRANSACTION");
      for (const [char, code] of Object.entries(extData)) {
         stmt.run([char, code, 1]);
      }
      db.exec("COMMIT");
    }
  } catch(e) { 
      // Extended dictionary might not exist, which is fine
      console.log("Extended dictionary not found or skipped.");
  }

  stmt.free();
  dbInstance = db;
}

/**
 * Query a character from the database.
 */
export const lookupChar = (char: string, allowExtended: boolean): string | null => {
  if (!dbInstance) return null;

  const query = allowExtended 
    ? "SELECT code FROM dictionary WHERE char = $char" 
    : "SELECT code FROM dictionary WHERE char = $char AND is_extended = 0";

  try {
      const stmt = dbInstance.prepare(query);
      const result = stmt.getAsObject({ $char: char });
      stmt.free();

      if (result && result.code) {
        return result.code as string;
      }
  } catch (e) {
      console.warn("Query error:", e);
  }
  return null;
};

export const isDBReady = () => !!dbInstance;