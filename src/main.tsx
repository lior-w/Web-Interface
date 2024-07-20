import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const servers = ["http://18.217.79.174:8080", "http://127.0.0.1:8080"];
export const server = servers[0];

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
