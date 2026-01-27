const fs = require('fs');
const initSqlJs = require('sql.js');
const path = require('path');

// 1. JSONファイルを読み込む
// ※ パスは環境に合わせて調整してください
const corePath = path.join(__dirname, '../public/cangjie-dictionary.json');
const extPath = path.join(__dirname, '../public/cangjie-dictionary-extended.json');

const coreData = JSON.parse(fs.readFileSync(corePath, 'utf8'));
// 拡張辞書がない場合は空オブジェクトとする
let extData = {};
try {
    extData = JSON.parse(fs.readFileSync(extPath, 'utf8'));
} catch (e) {
    console.log("Extended dictionary not found or empty, skipping.");
}

// 2. SQLiteデータベースを作成
initSqlJs().then((SQL) => {
    const db = new SQL.Database();

    // テーブル作成: char(漢字), code(倉頡コード), is_extended(拡張フラグ 0 or 1)
    db.run("CREATE TABLE dictionary (char TEXT PRIMARY KEY, code TEXT, is_extended INTEGER);");
    db.run("CREATE INDEX idx_char ON dictionary (char);"); // 検索高速化のためのインデックス

    const stmt = db.prepare("INSERT OR IGNORE INTO dictionary VALUES (?, ?, ?)");

    console.log("Inserting Core Dictionary...");
    db.exec("BEGIN TRANSACTION");
    for (const [char, code] of Object.entries(coreData)) {
        stmt.run([char, code, 0]); // 0 = Core
    }
    
    console.log("Inserting Extended Dictionary...");
    for (const [char, code] of Object.entries(extData)) {
        // Coreにあるものは上書きしない（IGNORE）
        stmt.run([char, code, 1]); // 1 = Extended
    }
    db.exec("COMMIT");
    stmt.free();

    // 3. ファイルとして書き出し
    const data = db.export();
    const buffer = Buffer.from(data);
    const outputPath = path.join(__dirname, '../public/cangjie.db');
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`Database created successfully at: ${outputPath}`);
    console.log(`Total size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
});