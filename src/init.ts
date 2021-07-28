import dbManager from "./DbManager";
// eslint-disable-next-line import/no-webpack-loader-syntax
import wsWorker from "worker-loader!./webworker/worker";
export const theWebWorker = new wsWorker();
export const theDbManager = dbManager.getInstance();
void theDbManager.init();
