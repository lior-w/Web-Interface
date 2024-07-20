import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const servers = [
  "http://3.145.82.231:8080",
  "http://127.0.0.1:8080",
  "http://172.31.8.223:8080",
];
export const server = servers[2];

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
