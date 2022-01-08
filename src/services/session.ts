import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';


export default class SQLiteSession {
  dbName: string;
  sqlite: SQLiteConnection;
  initializedWeb: boolean;

  constructor(dbName: string) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite)
    this.dbName = dbName;
    this.initializedWeb = false;
  }

  private async initWeb() {
    // TODO: add IOS and Android initialization
    const platform = Capacitor.getPlatform();
    if(platform === "web" && !this.initializedWeb) {
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      await this.sqlite.initWebStore();
    }
    this.initializedWeb = true;
  }

  private async conn(dbName: string): Promise<SQLiteDBConnection> {
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

  async query(query: string): Promise<any> {
    const db = await this.conn(this.dbName);
    await db.open()
    const data = await db.query(query);
    await db.close()
    return data.values
  }

  async execute(query: string) {
    const db = await this.conn(this.dbName);
    await db.open()
    const data = await db.execute(query);
    await db.close()
    return data.changes
  }
}
