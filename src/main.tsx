import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FoundationsPage from "./FoundationsPage";
import ShowcasePage from "./ShowcasePage";
import "./App.css";

const currentPath = window.location.pathname.replace(/\/+$/, "");
const page = currentPath === "/showcase"
  ? <ShowcasePage />
  : currentPath === "/foundations"
    ? <FoundationsPage />
    : <App />;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>,
);
