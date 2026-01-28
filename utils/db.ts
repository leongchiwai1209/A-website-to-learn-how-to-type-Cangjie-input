import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

let dbInstance: Database | null = null;
let sqlInstance: SqlJsStatic | null = null;

// The user-provided GAS Web App URL
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbzTX1skXaR4ik_ujtzC5oZ8j05hujF9otQzwcDXQxzmOCbkEgeGn8_ce8EUCD43Oqhr/exec";

export interface DBResult {
  code: string;
  isExtended: boolean;
}

/**
 * Initialize the SQLite engine (Lightweight Core Only).
 * 
 * We no longer load the huge CSV background task.
 * Instead, we will hit the GAS API for extended queries.
 */
export const initDB = async (coreUrl: string): Promise<void> => {
  if (dbInstance) return;

  try {
    // 1. Load WASM
    const wasmUrl = 'https://esm.sh/sql.js@1.13.0/dist/sql-wasm.wasm';
    
    const wasmRes = await fetch(wasmUrl);
    if (!wasmRes.ok) throw new Error(`Failed to load WASM`);
    const wasmBinary = await wasmRes.arrayBuffer();

    sqlInstance = await initSqlJs({ wasmBinary });
    const db = new sqlInstance.Database();

    // Create Tables
    db.run("CREATE TABLE dictionary (char TEXT PRIMARY KEY, code TEXT, is_extended INTEGER);");
    db.run("CREATE INDEX idx_char ON dictionary (char);");
    
    dbInstance = db;

    // 2. Load Core Dictionary (Fast)
    await loadCoreDictionary(db, coreUrl);

  } catch (err) {
    console.error("Failed to initialize SQLite:", err);
    throw err;
  }
};

/**
 * Load the small core JSON dictionary.
 */
async function loadCoreDictionary(db: Database, url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Core dict fetch failed");
    
    const data = await res.json() as Record<string, string>;
    const stmt = db.prepare("INSERT OR IGNORE INTO dictionary VALUES (?, ?, 0)");
    
    db.exec("BEGIN TRANSACTION");
    for (const [char, code] of Object.entries(data)) {
         stmt.run([char, code]);
    }
    db.exec("COMMIT");
    stmt.free();
  } catch (e) {
    console.error("Error loading core dictionary:", e);
  }
}

/**
 * Query a character from Local Core DB.
 * Returns null if not found.
 */
export const lookupLocalChar = (char: string): string | null => {
  if (!dbInstance) return null;
  
  try {
      const stmt = dbInstance.prepare("SELECT code FROM dictionary WHERE char = $char");
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

/**
 * Query a character from Google Apps Script API.
 * This solves the "heavy download" issue by fetching on demand.
 */
export const searchRemote = async (char: string): Promise<string | null> => {
  try {
    // Assuming the GAS script accepts ?char=X and returns JSON
    const url = `${GAS_API_URL}?char=${encodeURIComponent(char)}`;
    const res = await fetch(url);
    
    if (!res.ok) return null;
    
    const data = await res.json();
    // Support various return formats: { code: "ABC" } or just "ABC" or { result: ... }
    if (data && typeof data.code === 'string') {
        return data.code;
    }
    // If user script returns just the object from Sheet like { char: "...", code: "..." }
    if (data && data.code) return data.code;
    
    return null;
  } catch (e) {
    console.warn("Remote search failed:", e);
    return null;
  }
};

export const isDBReady = () => !!dbInstance;
