import { useState } from "react";
import SavedGames from "../components/SavedGames";
import Login from "../components/Login";

export const Dashboard = () => {
  const [page, setPage] = useState<string>("login");

  const onLogin = () => {
    setPage("savedgames");
  };

  return (
    <div>
      {page === "savedgames" && <SavedGames />}
      {page === "login" && <Login onLoginSuccess={onLogin} />}
    </div>
  );
};
