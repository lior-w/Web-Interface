import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

//export const server = "http://13.59.100.152:8080";
export const server = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
