import { useState } from "react";
import SavedGames from "./SavedGames";
import Login from "./Login";
import Registration from "./Registration";
import CreateGame from "./CreateGame";
import MainPage from "./mainPage";
import { CreateQuestion } from "./CreateQuestion";
import { CreateQuestionaire } from "./CreateQuestionaire";
import WaitingRoom from "./WaitingRoom";

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

  const toCreateQuestionaire = () => {
    setPage("createQuestionaire");
  };

  const toWaitingRoom = () => {
    setPage("waitingRoom");
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
      {page === "createQuestionaire" && (
        <CreateQuestionaire toMain={toMainPage} onSubmit={() => {}} />
      )}
      {page === "waitingRoom" && (
        <WaitingRoom
          toMain={toMainPage}
          game={{
            id: 1,
            title: "Exciting Adventure",
            description:
              "Embark on a thrilling journey through uncharted territories.",
            questionaire: "Adventure Questions",
            map: "Mystery Island",
            numGroups: 4,
            status: "created",
          }}
        />
      )}

      {page === "main" && (
        <MainPage
          toLogin={toLogin}
          toRegisrtation={toRegistration}
          toCreateGame={toCreateGame}
          toSavedGames={toSavedGames}
          toCreateQuestion={toCreateQuestion}
          toCreateQuestionaire={toCreateQuestionaire}
          toWaitingRoom={toWaitingRoom}
        />
      )}
      {page === "createGame" && <CreateGame toMain={toMainPage}></CreateGame>}
    </div>
  );
};
