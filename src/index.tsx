import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./redux/rootStore";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./App";

import { PersistGate } from "redux-persist/lib/integration/react";
import ErrorBoundary from "./components/generic/errorBoundary/ErrorBoundary";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ErrorBoundary fullscreen>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </>
);
registerServiceWorker();
