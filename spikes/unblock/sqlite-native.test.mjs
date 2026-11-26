import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
export function check(db){try{db.exec("CREATE VIRTUAL TABLE memories USING fts5(content); INSERT INTO memories VALUES ('PostgreSQL'),('Angular'); BEGIN; INSERT INTO memories VALUES ('temporary'); ROLLBACK;");assert.equal(db.prepare('SELECT content FROM memories WHERE memories MATCH ?').all('PostgreSQL').length,1);assert.equal(Number(db.prepare('SELECT count(*) AS n FROM memories').get().n),2);console.log(db.prepare('SELECT sqlite_version() AS version').get());}finally{db.close();}}
test('native SQLite FTS5 and rollback',()=>check(new DatabaseSync(':memory:')));
