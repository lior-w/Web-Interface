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
/*
{
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
}
*/
export const Dashboard = () => {
  const [page, setPage] = useState<string>("main");
  const [token, setToken] = useState<Token>({ AUTHORIZATION: "" });
  const [gameId, setGameId] = useState<string>("");
  const [runningGameId, setRunningGameId] = useState<string>("");
  const [logged, setLogged] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState("");

  const toSavedGames = () => setPage("savedGames");

  const toRegistration = () => setPage("registration");

  const toLogin = () => setPage("login");

  const toCreateGame = () => setPage("createGame");

  const toCreateQuestion = () => setPage("createQuestion");

  const toCreateQuestionaire = () => setPage("createQuestionaire");

  const toWaitingRoom = () => setPage("waitingRoom");

  const toRunningGame = () => setPage("runningGame");

  const toMainPage = () => setPage("main");

  return (
    <div>
      {page === "runningGame" && (
        <RunningGame runningGameId={runningGameId} token={token}></RunningGame>
      )}
      {page === "savedGames" && (
        <SavedGames
          token={token}
          toMain={toMainPage}
          toWaitingRoom={(gameId: string) => {
            setGameId(gameId);
            setPage("waitingRoom");
          }}
        />
      )}
      {page === "login" && (
        <Login
          onLoginSuccess={(token, username) => {
            setToken(token);
            setLogged(true);
            setLoggedUsername(username);
            toMainPage();
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
          toGame={(runningGameId) => {
            setRunningGameId(runningGameId);
            setPage("runningGame");
          }}
          gameId={gameId}
        />
      )}

      {page === "main" && (
        <MainPage
          token={token}
          logged={logged}
          username={loggedUsername}
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
