import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App25.jsx";
// import App from "./App25.jsx"
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./hooks/SnackBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
