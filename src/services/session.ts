import { Capacitor } from '@capacitor/core';
import { Source, Feed } from '../models'
import { DBResult, Err } from '@/models'


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

  public async modify(query: string, args: any[] = []): Promise<DBResult> {
    const db = await this.conn;
    await db.open();
    let result: DBResult;

    try {
      const changes = (await db.run(query, args)).changes;

      if (typeof(changes) === 'number' ) {
        result = {changes: changes}
      } else {
        result = {changes: changes?.changes, lastId: changes?.lastId}
      }
    } catch (err: any) {
      result = {err: {message: err}}
    } finally {
      await db.close();
    }

    return result;
  }

  public async select(query: string): Promise<DBResult> {
    const db = await this.conn;
    await db.open();
    let result: DBResult;

    try {
      const resp = (await db.query(query)).values
      result = {data: resp}
    } catch (err: any) {
      result = {err: {message: err}}
    } finally {
      await db.close();
    }

    return result;
  }
}
