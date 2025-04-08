// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./lib/redux/store.ts";
import ThemeProvider from "./context/ThemeProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./lib/error_boundary/ErrorFallback.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallBack}>
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
  // </StrictMode>
);
