import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ref } from "vue";


const inDbSources = ref<any>();

(async function selectSources() {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  if(platform === "web") {
    // Create the 'jeep-sqlite' Stencil component
    const jeepSqlite = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepSqlite);
    await customElements.whenDefined('jeep-sqlite');
    // Initialize the Web store
    await sqlite.initWebStore();
  }
  // example: database creation with standard SQLite statements
  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection("db_tab3SQLite")).result;
  let db: SQLiteDBConnection;
  if (ret.result && isConn) {
    db = await sqlite.retrieveConnection("db_tab3SQLite");
  } else {
    db = await sqlite.createConnection("db_tab3SQLite", false, "no-encryption", 1);
  }
  await db.open();

  const query = `
  CREATE TABLE IF NOT EXISTS test (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL
  );
  `;
  const res = await db.execute(query);
  // const change = await db.execute(`INSERT INTO test (id, name) VALUES (17, 'if i could')`);
  const data = await db.query('SELECT * FROM test');
  await sqlite.closeConnection("db_tab3SQLite");

  inDbSources.value = data.values
  // .entries().map( (obj) => {
  //   return { obj[0]: obj[1] }
  // })
})()


export default inDbSources;
