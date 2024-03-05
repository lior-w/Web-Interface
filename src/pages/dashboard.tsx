import { useState } from "react";
import SavedGames from "./SavedGames";
import Login from "./Login";
import Registration from "./Registration";
import CreateGame from "./CreateGame";
import MainPage from "./mainPage";
import CreateQuestion from "./CreateQuestion";

export const Dashboard = () => {
  const [page, setPage] = useState<string>("main");

  const toSavedGames = () => {
    setPage("savedGames");
  };

  const toRegistration = () => {
    setPage("registration");
  };

  const toLogin = () => {
    setPage("login");
  };

  const toCreateGame = () => {
    setPage("createGame");
  };

  const toCreateQuestion = () => {
    setPage("createQuestion");
  };

  const toMainPage = () => {
    setPage("main");
  };

  return (
    <div>
      {page === "savedGames" && <SavedGames toMain={toMainPage} />}
      {page === "login" && (
        <Login
          onLoginSuccess={toSavedGames}
          onSignUp={toRegistration}
          toMain={toMainPage}
        />
      )}
      {page === "registration" && (
        <Registration
          onRegistrationSuccess={toLogin}
          onSignIn={toLogin}
          toMain={toMainPage}
        />
      )}
      {page === "createQuestion" && (
        <CreateQuestion toMain={toMainPage} onSubmit={() => {}} />
      )}
      {page === "main" && (
        <MainPage
          toLogin={toLogin}
          toRegisrtation={toRegistration}
          toCreateGame={toCreateGame}
          toSavedGames={toSavedGames}
          toCreateQuestion={toCreateQuestion}
        />
      )}
      {page === "createGame" && <CreateGame toMain={toMainPage}></CreateGame>}
    </div>
  );
};
