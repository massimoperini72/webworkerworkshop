import React from 'react';
import './App.css';
import { theWebWorker } from "./init";
import {IWorkerData} from "./webworker/worker";

function App() {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputDbRef = React.useRef<HTMLInputElement>(null);
  const [receivedText, setReceivedText] = React.useState<string>("");

  const onWorkerMessage = (message: MessageEvent) => {
    const data = message.data as IWorkerData;
    switch(data.operation) {
      case "sendPong":
        setReceivedText(data.data);
        break;
      default:
        break;
    }
  };

  theWebWorker.onmessage = onWorkerMessage;

  const sendPingToWorker = (): void => {
    if (!inputRef.current || inputRef.current.value === "")
      return;
    theWebWorker.postMessage({ operation: "sendPing", data: inputRef.current.value });
  }

  const addRecordToDb = (): void => {
    if (!inputDbRef.current || inputDbRef.current.value === "")
      return;
    const record = {
      timestamp: new Date().getTime(),
      text: inputDbRef.current.value
    };
    theWebWorker.postMessage({ operation: "addRecordToDB", data: record });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Web worker workshop</h4>
      </header>
      <div>
        <h4>Echo test</h4>
        <input type="text" ref={inputRef} />
        <button onClick={sendPingToWorker}>Send to worker</button>
        <div>{receivedText}</div>
      </div>
      <div>
        <h4>Indexed db</h4>
        <input type="text" ref={inputDbRef} />
        <button onClick={() => addRecordToDb()}>Add record to DB</button>
      </div>
    </div>
  );
}

export default App;
