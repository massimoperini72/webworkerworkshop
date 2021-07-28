import dbManager from "../DbManager";
const theDbManager = dbManager.getInstance();
void theDbManager.init();

export interface IWorkerData {
  operation: string;
  data?: any;
}

// eslint-disable-next-line no-restricted-globals
const workerCtx: Worker = self as never;

workerCtx.onmessage = (event: MessageEvent) => {
  const workerData = event.data as IWorkerData;
  switch(workerData.operation) {
    case "addRecordToDB":
      void theDbManager.addRecord(workerData.data);
      break;
    case "sendPing":
      workerCtx.postMessage({ operation: "sendPong", data: workerData.data });
      break;
    default:
      break;
  }
}
