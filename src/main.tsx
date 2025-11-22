import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Providers } from "./providers/providers.tsx";

import "@/styles/globals.css";
import { initializeTelegramSDK } from "@/init-mini-app.ts";

initializeTelegramSDK(true);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
);
