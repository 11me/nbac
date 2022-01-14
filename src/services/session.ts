import { Capacitor } from '@capacitor/core';
import { Source, Feed } from '../models'

import
{
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';


export default class SQLiteSession {
  dbName: string;
  sourcesTable: string;
  feedsTable: string;
  platform: string;
  sqliteConn: SQLiteConnection;
  conn: Promise<SQLiteDBConnection>;

  constructor(dbName: string) {
    this.sqliteConn = new SQLiteConnection(CapacitorSQLite);
    this.dbName = dbName;
    this.sourcesTable = 'trd_sources';
    this.feedsTable = 'feeds';
    this.platform = Capacitor.getPlatform();
    //TODO: get rid of async call in constructor
    this.conn = (async () => { return await this.getCoonection()})();
  }

  private async initWeb() {
    const jeepSqlite = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepSqlite);
    await customElements.whenDefined('jeep-sqlite');
    await this.sqliteConn.initWebStore();
  }

  private async getCoonection(): Promise<SQLiteDBConnection> {

    if (this.platform === 'web') {
      await this.initWeb();
    }
    // check connection consistency between js and native connection
    const connConsistent = (await this.sqliteConn.checkConnectionsConsistency()).result;

    // check if connection exists
    const connExists = (await this.sqliteConn.isConnection(this.dbName)).result;

    if (connConsistent && connExists) {
      return await this.sqliteConn.retrieveConnection(this.dbName);
    }

    return await this.sqliteConn.createConnection(this.dbName, false, "no-encryption", 1);
  }

  // createTables returns the number of changes were made
  // or -1 if nothing happened
  public async createTables(): Promise<number> {
    const db = await this.conn;
    await db.open();

    const changes = (await db.execute(`
      CREATE TABLE IF NOT EXISTS ${this.sourcesTable} (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        url VARCHAR(255) NOT NULL,
        state INTEGER NOT NULL,
        notify INTEGER NOT NULL,
        last_update INTEGER NOT NULL,
        source_type VARCHAR(10) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ${this.feedsTable} (
        id INTEGER PRIMARY KEY NOT NULL,
        guid VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(50),
        pub_date VARCHAR(20),
        content TEXT NOT NULL,
        source_id INTEGER NOT NULL,
        seen INTEGER DEFAULT 0,
        FOREIGN KEY(source_id) REFERENCES ${this.sourcesTable}(id)
    );`)).changes;

    //TODO: get rid of console.log
    console.log('createTables');
    await db.close();

    if (typeof(changes) === 'number' ) {
      return changes;
    }
    return -1;
  }

  public async getSourceByID(sourceId: number): Promise<any> {
    const db = await this.conn;
    await db.open();

    const query = `
    SELECT * FROM ${this.sourcesTable}
    WHERE id=${sourceId}`;
    const data = (await db.query(query)).values;

    await db.close();

    if (data) {
      return data;
    }
    return null;
  }

  // TODO: add offset as parameter for pagination
  public async getAllSources(): Promise<Source[]> {
    const db = await this.conn;
    await db.open();

    const query = `SELECT * FROM ${this.sourcesTable}`;
    const data = (await db.query(query)).values;

    await db.close();
    if (data) {
      return data
    }
    return []
  }

  // TODO: make it UPSERT
  public async updateSource(source: Source): Promise<number> {
    const db = await this.conn;
    await db.open();
    const updated = (await db.execute(`
      UPDATE
        ${this.sourcesTable}
      SET
        name='${source.name}',
        url='${source.url}',
        last_update=${source.last_update},
        notify=${source.notify},
        state=${source.state}
      WHERE
        id=${source.id}`)).changes;

    await db.close();

      if (typeof(updated) === 'number') {
        return updated;
      }
      return -1;
  }

  public async deleteSourceByID(sourceId: number): Promise<number> {
    const db = await this.conn;
    await db.open();

    const deleted = (
      await db.execute(`DELETE FROM ${this.sourcesTable} WHERE id=${sourceId}`)
    ).changes;

    await db.close();

    if (typeof(deleted) === 'number') {
      return deleted;
    }
    return -1;
  }

  public async insertSource(source: Source): Promise<number> {
    //console.log(source)
    const db = await this.conn;
    await db.open();
    const query = `
      INSERT INTO
        ${this.sourcesTable} (name, url, state, notify, last_update, source_type)
      VALUES (
        '${source.name}',
        '${source.url}',
        ${source.state},
        ${source.notify},
        ${source.last_update},
        '${source.source_type}'
      )
      RETURNING id`;
    const lastId = (await db.run(query)).changes?.lastId;

    await db.close();

    if (lastId) {
      return  lastId;
    }
    return -1;
  }

  public async insertFeed(feed: Feed, src_id: number): Promise<number> {
    const db = await this.conn;
    await db.open();

    const query = `
    INSERT INTO ${this.feedsTable}
    (
      guid,
      title,
      author,
      pub_date,
      content,
      source_id
    )
    VALUES (
      ${feed.guid},
      ${feed.title},
      ${feed.author},
      ${feed.pub_date},
      ${feed.content},
      ${src_id}
    );`;

    const lastId = (await db.run(query)).changes?.lastId;

    db.close();

    if (lastId) {
      return lastId;
    }
    return -1;
  }

  public async getAllFeeds(): Promise<Feed[]> {
    const query = `SELECT * FROM ${this.feedsTable}`
    const db = await this.conn;
    await db.open();

    const feeds = (await db.query(query)).values;


    await db.close();
    if (feeds) {
      return feeds
    }
    return []
  }

}
