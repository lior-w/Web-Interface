import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const servers = ["http://3.137.211.28:8080", "http://localhost:8080"];
export const server = servers[0];

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
