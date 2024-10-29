import React from "react";
import ReactDOM from "react-dom/client";
import App from "./OperatorApp.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider  } from "react-query";
import { AppContextProvider } from "./contexts/OperatorAppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
    <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
