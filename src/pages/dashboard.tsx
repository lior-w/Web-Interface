import { useState } from "react";
import { SavedGames, IGame } from "./SavedGames";
import Login from "./Login";
import Registration from "./Registration";
import CreateGame from "./CreateGame";
import MainPage from "./mainPage";
import { CreateQuestion } from "./CreateQuestion";
import { CreateQuestionaire } from "./CreateQuestionaire";
import WaitingRoom from "./WaitingRoom";
import { Game } from "./Game";

export const Dashboard = () => {
  const [page, setPage] = useState<string>("main");
  const [token, setToken] = useState<string>("");
  const [game, setGame] = useState<IGame>({
    id: 1,
    title: "Exciting Adventure",
    description: "Embark on a thrilling journey through uncharted territories.",
    questionaire: "Adventure Questions",
    map: "Mystery Island",
    numGroups: 4,
    status: "created",
  });

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

  const toGame = () => {
    setPage("game");
  };

  const toMainPage = () => {
    setPage("main");
  };

  return (
    <div>
      {page === "savedGames" && (
        <SavedGames
          token={token}
          toMain={toMainPage}
          toWaitingRoom={(game: IGame) => {
            setGame(game);
            setPage("waitingRoom");
          }}
        />
      )}
      {page === "login" && (
        <Login
          onLoginSuccess={(token) => {
            setToken(token);
            toSavedGames;
          }}
          onSignUp={toRegistration}
          toMain={toMainPage}
        />
      )}
      {page === "registration" && (
        <Registration
          token={token}
          onRegistrationSuccess={toLogin}
          onSignIn={toLogin}
          toMain={toMainPage}
        />
      )}
      {page === "createQuestion" && (
        <CreateQuestion token={token} toMain={toMainPage} onSubmit={() => {}} />
      )}
      {page === "createQuestionaire" && (
        <CreateQuestionaire
          token={token}
          toMain={toMainPage}
          onSubmit={() => {}}
        />
      )}
      {page === "waitingRoom" && (
        <WaitingRoom toMain={toMainPage} toGame={toGame} game={game} />
      )}

      {page === "main" && (
        <MainPage
          token={token}
          toLogin={toLogin}
          toRegisrtation={toRegistration}
          toCreateGame={toCreateGame}
          toSavedGames={toSavedGames}
          toCreateQuestion={toCreateQuestion}
          toCreateQuestionaire={toCreateQuestionaire}
          toWaitingRoom={toWaitingRoom}
        />
      )}
      {page === "createGame" && (
        <CreateGame token={token} toMain={toMainPage}></CreateGame>
      )}
      {page === "game" && <Game></Game>}
    </div>
  );
};

// {
//   id: 1,
//   title: "Exciting Adventure",
//   description:
//     "Embark on a thrilling journey through uncharted territories.",
//   questionaire: "Adventure Questions",
//   map: "Mystery Island",
//   numGroups: 4,
//   status: "created",
// }
