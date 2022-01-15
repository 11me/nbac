// Dabatase service incapsultes methods
// to communicate with SQLiteDBSession.

import { Source, Err, DBResult } from '@/models';

const SOURCES_TABLE = 'sources';
const FEEDS_TABLE   = 'feeds';

const INIT = `
   CREATE TABLE IF NOT EXISTS ${SOURCES_TABLE} (
      id INTEGER PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      state INTEGER NOT NULL,
      notify INTEGER NOT NULL,
      last_update INTEGER NOT NULL,
      source_type VARCHAR(10) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS ${FEEDS_TABLE} (
      id INTEGER PRIMARY KEY NOT NULL,
      guid VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(50),
      pub_date VARCHAR(20),
      content TEXT NOT NULL,
      source_id INTEGER NOT NULL,
      seen INTEGER DEFAULT 0,
      FOREIGN KEY(source_id) REFERENCES ${SOURCES_TABLE}(id)`;

// init creates new tables in database
async function init() {
  //TODO: implement
}

//** logic related to sources //

async function insertSource(source: Source): Promise<DBResult> {

  const sqlcmd = `INSERT INTO ${SOURCES_TABLE}
  (
    name,
    url,
    last_update,
    notify,
    state,
    source_type
  )
  VALUES (?,?,?,?,?,?)
  RETURNING id;`;

  const values = [
    source.name,
    source.url,
    Date.now(),
    1,
    1,
    source.source_type
  ];
  //TODO: implement a call to session
  return {
    changes: 1,
    lastId: 1
  }
}

async function getSources(): Promise<DBResult> {
  const query = `SELECT * FROM ${SOURCES_TABLE}`;

  //TODO: implement a call

  return {
    err: undefined,
    data: [
      {
        id: 1,
        name: 'BBC News',
        url: 'http://example.com',
        last_update: Date.now(),
        notify: 1,
        state: 1,
        source_type: 'rss'
      }
    ]
  }
}

async function updateSource(source: Source): Promise<DBResult> {
  const sqlcmd = `
  UPDATE ${SOURCES_TABLE} s
  SET
    last_update = ?,
    state = ?
  WHERE
    s.id = ?;`;

  const values = [
    Date.now(),
    source.state,
    source.id
  ]

  //TODO: implement
  return {
    changes: 1
  }
}
