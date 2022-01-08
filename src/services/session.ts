import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Source } from '../models'

export default class SQLiteSession {
  dbName: string;
  sqlite: SQLiteConnection;
  initializedWeb: boolean;
  conn: Promise<SQLiteDBConnection>;

  constructor(dbName: string) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite)
    this.dbName = dbName;
    this.initializedWeb = false;
    this.conn = (async () => { return await this.getCoonection(dbName)})();
  }

  private async initWeb() {
    // TODO: add IOS and Android initialization
    const platform = Capacitor.getPlatform();
    if (platform === "web" && !this.initializedWeb) {
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      await this.sqlite.initWebStore();
    }
    this.initializedWeb = true;
  }

  private async getCoonection(dbName: string): Promise<SQLiteDBConnection> {
    await this.initWeb();
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(dbName)).result;
    let db: SQLiteDBConnection;
    if (ret.result && isConn) {
      db = await this.sqlite.retrieveConnection(dbName);
    } else {
      db = await this.sqlite.createConnection(dbName, false, "no-encryption", 1);
    }
    return db;
  }

  // async query(query: string): Promise<any> {
  //   const db = await this.conn;
  //   await db.open();
  //   const data = await db.query(query);
  //   await db.close()
  //   return data.values
  // }
  //
  // async execute(query: string) {
  //   const db = await this.conn;
  //   await db.open();
  //   const data = await db.execute(query);
  //   await db.close()
  //   return data.changes
  // }

  async createTables(): Promise<void> {
    const db = await this.conn;
    await db.open();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS trd_sources (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        state INTEGER NOT NULL,
        notify INTEGER NOT NULL,
        last_update INTEGER NOT NULL
    );`);
    console.log('here')
    await db.close()
  }

  async selectSource(sourceId=0): Promise<any> {
    const query = !sourceId ? 'SELECT * FROM trd_sources': `SELECT * FROM trd_sources WHERE id=${sourceId}`;

    const db = await this.conn
    await db.open();
    const data = await db.query(query);
    await db.close()
    return data.values
  }

  async updateSource(source: Source): Promise<void> {
    const db = await this.conn;
    await db.open();
    await db.execute(`
      UPDATE
        trd_sources
      SET
        name='${source.name}',
        url='${source.url}',
        last_update=${source.last_update},
        notify=${source.notify},
        state=${source.state}
      WHERE
        id=${source.id}`);
    await db.close()
  }

  async deleteSource(sourceId: number): Promise<void> {
    const db = await this.conn;
    await db.open();
    await db.execute(`DELETE FROM trd_sources WHERE id=${sourceId}`);
    await db.close()
  }

  async insertSource(source: Source): Promise<void> {
    console.log(source)
    const db = await this.conn;
    await db.open();
    const query = `
      INSERT INTO
        trd_sources (name, url, state, notify, last_update)
      VALUES (
        '${source.name}',
        '${source.url}',
        ${source.state},
        ${source.notify},
        ${source.last_update}
      )`
    await db.execute(query);
    await db.close()
  }
}
