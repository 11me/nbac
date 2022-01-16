// Dabatase service incapsultes methods
// to communicate with SQLiteDBSession.
import { Source, Feed, Err, DBResult } from '@/models';
import session from '@/main'


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
      FOREIGN KEY(source_id) REFERENCES ${SOURCES_TABLE}(id))`;

// init creates new tables in database
export async function init(): Promise<void> {
  await session.modify(INIT);
}

//** logic related to sources //

export async function insertSource(source: Source): Promise<DBResult> {

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
    Date.now().toString(),
    1,
    1,
    source.source_type
  ];
  return await session.modify(sqlcmd, values);
}


export async function getSources(): Promise<DBResult> {
  const query = `SELECT * FROM ${SOURCES_TABLE};`;
  return await session.select(query);
}

export async function updateSource(source: Source): Promise<DBResult> {
  const sqlcmd = `
  UPDATE ${SOURCES_TABLE}
  SET
    last_update = ?,
    notify = ?
  WHERE
    id = ?;`;

  const values = [
    Date.now(),
    source.notify,
    source.id
  ];
  return await session.modify(sqlcmd, values);
}

//** logic related to feeds //

export async function getFeeds(): Promise<DBResult> {
  const query = `SELECT * FROM ${FEEDS_TABLE};`;
  return await session.select(query);
}

export async function insertFeed(feed: Feed, src_id: number): Promise<DBResult> {
  const sqlcmd = `
  INSERT INTO ${FEEDS_TABLE}
  (
    guid,
    title,
    author,
    pub_date,
    content,
    source_id,
    seen
  )
  VALUES
  (
    ?,?,?,?,?,?,?
  );`;

  const values = [
    feed.guid,
    feed.title,
    feed.author,
    feed.pub_date,
    feed.content,
    src_id
  ];

  return await session.modify(sqlcmd, values);
}
