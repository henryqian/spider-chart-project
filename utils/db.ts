// utils/db.ts
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        count INTEGER
      )
    `);
    const result = await db.get('SELECT count FROM page_views WHERE id = 1');
    if (!result) {
      await db.run('INSERT INTO page_views (id, count) VALUES (1, 0)');
    }
  }
  return db;
}

export async function incrementPageViews() {
  const db = await openDb();
  await db.run('UPDATE page_views SET count = count + 1 WHERE id = 1');
  const result = await db.get('SELECT count FROM page_views WHERE id = 1');
  return result.count;
}

export async function getPageViews() {
  const db = await openDb();
  const result = await db.get('SELECT count FROM page_views WHERE id = 1');
  return result.count;
}