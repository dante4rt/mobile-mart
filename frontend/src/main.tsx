import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./api/trpc.ts";
import { httpBatchLink } from "@trpc/client";
import "./index.css";

const queryClient = new QueryClient();

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers() {
        const token = getAuthToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
