import { useState } from "react";
import { SavedGames } from "./SavedGames";
import Login from "./Login";
import Registration from "./Registration";
import CreateGame from "./CreateGame";
import MainPage from "./mainPage";
import { CreateQuestion } from "./CreateQuestion";
import { CreateQuestionaire } from "./CreateQuestionaire";
import WaitingRoom from "./WaitingRoom";
import { RunningGame } from "./RunningGame";
import { CountriesMapComp } from "../components/countriesMap";
import { westUsaMap } from "../maps/westUsaMap";
import { Token, Game, Questionaire } from "../types";

export const Dashboard = () => {
  const [page, setPage] = useState<string>("maps");
  const [token, setToken] = useState<Token>({ AUTHORIZATION: "" });
  const [game, setGame] = useState<Game>({
    id: "",
    name: "Empty Game",
    host: { id: "", username: "", email: "", permissions: "" },
    description: "empty desc",
    questionnaire: { id: "", name: "Empty Questionnaire", questions: [] },
    map: { id: "", name: "empty map", statringPositions: [] },
    numberOfGroups: 2,
    status: "CREATED",
    groupAssignmentProtocol: "RENDOM",
    gameTime: 60,
    questionTimeLimit: 2,
    shared: true,
    runningId: "",
    tiles: [],
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
      {page === "maps" && (
        <CountriesMapComp
          gameRunningId={game.runningId}
          countriesMap={westUsaMap}
          token={token}
        ></CountriesMapComp>
      )}
      {page === "savedGames" && (
        <SavedGames
          token={token}
          toMain={toMainPage}
          toWaitingRoom={(game: Game) => {
            setGame(game);
            setPage("waitingRoom");
          }}
        />
      )}
      {page === "login" && (
        <Login
          onLoginSuccess={(token) => {
            setToken(token);
            toSavedGames();
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
        <CreateQuestionaire token={token} toMain={toMainPage} />
      )}
      {page === "waitingRoom" && (
        <WaitingRoom
          token={token}
          toMain={toMainPage}
          toGame={toGame}
          game={game}
        />
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
      {page === "game" && <RunningGame></RunningGame>}
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
