import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { DataScenarioProvider } from "./state/DataScenarioContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataScenarioProvider>
        <App />
      </DataScenarioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
