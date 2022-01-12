import { Capacitor } from '@capacitor/core';
import { Source } from '../models'

import
{
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  capSQLiteChanges
} from '@capacitor-community/sqlite';


export default class SQLiteSession {
  dbName: string;
  platform: string;
  sqliteConn: SQLiteConnection;
  conn: Promise<SQLiteDBConnection>;

  constructor(dbName: string) {
    this.sqliteConn = new SQLiteConnection(CapacitorSQLite);
    this.dbName = dbName;
    this.platform = Capacitor.getPlatform();
    //TODO: get rid of async call in constructor
    this.conn = (async () => { return await this.getCoonection()})();
  }

  private async initWeb() {

    if (this.platform === "web") {
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      await this.sqliteConn.initWebStore();
    }
  }

  private async getCoonection(): Promise<SQLiteDBConnection> {
    await this.initWeb();
    // check connection consistency between js and native conn
    const connConsistent = (await this.sqliteConn.checkConnectionsConsistency()).result;
    // check if connection exists
    const connExists = (await this.sqliteConn.isConnection(this.dbName)).result;

    if (connConsistent && connExists) {
      return await this.sqliteConn.retrieveConnection(this.dbName);
    }

    return await this.sqliteConn.createConnection(this.dbName, false, "no-encryption", 1);
  }

  public async createTables(): Promise<capSQLiteChanges> {
    const db = await this.conn;
    await db.open();
    const changes = await db.execute(`
      CREATE TABLE IF NOT EXISTS trd_sources (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        state INTEGER NOT NULL,
        notify INTEGER NOT NULL,
        last_update INTEGER NOT NULL
    );`);
    console.log('createTables');
    await db.close();
    return changes;
  }

  public async getSourceByID(sourceId: number): Promise<any[] | undefined> {
    const db = await this.conn;
    await db.open();

    const query = `SELECT * FROM trd_sources WHERE id=${sourceId}`;
    const data = await db.query(query);

    await db.close();

    return data.values;
  }

  public async getAllSources(): Promise<any[] | undefined> {
    const db = await this.conn;
    await db.open();

    const query = `SELECT * FROM trd_sources`;
    const data = await db.query(query);

    await db.close();

    return data.values;
  }

  // TODO: make it UPSERT
  public async updateSource(source: Source): Promise<void> {
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
    await db.close();
  }

  public async deleteSourceByID(sourceId: number): Promise<void> {
    const db = await this.conn;
    await db.open();

    await db.execute(`DELETE FROM trd_sources WHERE id=${sourceId}`);
    await db.close();
  }

  public async insertSource(source: Source): Promise<void> {
    //console.log(source)
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
      )`;
    await db.execute(query);
    await db.close()
  }
}
