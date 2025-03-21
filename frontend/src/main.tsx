import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./lib/redux/store.ts";
import ThemeProvider from "./layouts/ThemeProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./common/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <ThemeProvider>
        <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
