import {DBSchema, IDBPDatabase, openDB} from "idb";
import {IDBPTransaction, StoreNames} from "idb/build/esm/entry";

export default class dbManager {
  private static instance: dbManager;
  // The connection of an indexed db.
  private dbConnection?: IDBPDatabase;
  private static dbName = "workshop";
  private static dbVersion = 1;
  private static storeName = "logs";

  /**
   * Gets instance of dbManager to use as singleton.
   *
   * @returns - an instance of this class.
   */
  public static getInstance(): dbManager {
    if (!dbManager.instance)
      dbManager.instance = new dbManager();
    return dbManager.instance;
  }

  public async init(): Promise<void> {
    await this.openDb();
  }

  private async openDb(): Promise<void> {
    this.dbConnection = await openDB(dbManager.dbName, dbManager.dbVersion, {
      upgrade: this.onUpgrade
    });
  }

  public async addRecord(record: any): Promise<void> {
    if (!this.dbConnection)
      return;
    const tx = this.dbConnection.transaction(dbManager.storeName, "readwrite");
    const store = tx.objectStore(dbManager.storeName);
    await store.add(record);
    await tx.done;
  }

  private onUpgrade(db: IDBPDatabase<DBSchema | unknown>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<DBSchema | unknown, StoreNames<DBSchema | unknown>[], "versionchange">): void {
    db.createObjectStore(dbManager.storeName, { autoIncrement: true });
  }

}
