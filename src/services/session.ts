import { Capacitor } from '@capacitor/core';
import { Source } from '../models'

import
{
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';


export default class SQLiteSession {
  dbName: string;
  tableName: string;
  platform: string;
  sqliteConn: SQLiteConnection;
  conn: Promise<SQLiteDBConnection>;

  constructor(dbName: string, tableName: string) {
    this.sqliteConn = new SQLiteConnection(CapacitorSQLite);
    this.dbName = dbName;
    this.tableName = tableName;
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
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        state INTEGER NOT NULL,
        notify INTEGER NOT NULL,
        last_update INTEGER NOT NULL
    );`)).changes;

    //TODO: get rid of console.log
    console.log('createTables');
    await db.close();

    if (typeof(changes) === 'number' ) {
      return changes;
    }
    return -1;
  }

  public async getSourceByID(sourceId: number): Promise<any[]> {
    const db = await this.conn;
    await db.open();

    const query = `SELECT * FROM ${this.tableName} WHERE id=${sourceId}`;
    const data = (await db.query(query)).values;

    await db.close();

    if (data) {
      return data;
    }
    return [];
  }

  public async getAllSources(): Promise<any[]> {
    const db = await this.conn;
    await db.open();

    const query = `SELECT * FROM ${this.tableName}`;
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
        ${this.tableName}
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
      await db.execute(`DELETE FROM ${this.tableName} WHERE id=${sourceId}`)
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
        ${this.tableName} (name, url, state, notify, last_update)
      VALUES (
        '${source.name}',
        '${source.url}',
        ${source.state},
        ${source.notify},
        ${source.last_update}
      )`;
    const inserted = (await db.execute(query)).changes;
    await db.close()

    if (typeof(inserted) === 'number') {
      return inserted;
    }
    return -1;
  }
}
