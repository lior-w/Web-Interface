import { useState } from "react";
import { SavedGames } from "./SavedGames";
import { Login } from "./Login";
import { Register } from "./Register";
import { CreateGame } from "./CreateGame";
import { MainPage } from "./mainPage";
import { CreateQuestion } from "./CreateQuestion";
import { CreateQuestionaire } from "./CreateQuestionaire";
import { WaitingRoom } from "./WaitingRoom";
import { RunningGame } from "./RunningGame";
import { CountriesMapComp } from "../components/countriesMap";
import { westUsaMap } from "../maps/westUsaMap";
import { Token, Game, Questionnaire, Pages } from "../types";
import { server } from "../main";
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
  const [loggedUsername, setLoggedUsername] = useState<string | undefined>(
    undefined
  );

  const toSavedGames = () => setPage("savedGames");

  const toRegistration = () => setPage("registration");

  const toLogin = () => setPage("login");

  const toCreateGame = () => setPage("createGame");

  const toCreateQuestion = () => setPage("createQuestion");

  const toCreateQuestionaire = () => setPage("createQuestionaire");

  const toWaitingRoom = () => setPage("waitingRoom");

  const toRunningGame = () => setPage("runningGame");

  const toMainPage = () => setPage("main");

  const toLogout = () => {
    setLogged(false);
    setLoggedUsername(undefined);
    setPage("main");
  };

  const pages: Pages = {
    Login: toLogin,
    Register: toRegistration,
    "New Game": toCreateGame,
    "New Question": toCreateQuestion,
    "New Questionnaire": toCreateQuestionaire,
    "My Games": toSavedGames,
    Logout: toLogout,
  };

  const filterPages: (pageNames: string[]) => Pages = (pageNames: string[]) => {
    const newPages: Pages = {};
    Object.keys(pages).forEach((page) => {
      if (pageNames.find((pageName) => pageName === page) !== undefined)
        newPages[page] = pages[page];
    });
    return newPages;
  };

  return (
    <div>
      {page === "runningGame" && (
        <RunningGame
          runningGameId={runningGameId}
          toMain={toMainPage}
          token={token}
        ></RunningGame>
      )}
      {page === "savedGames" && (
        <SavedGames
          token={token}
          toMain={toMainPage}
          username={loggedUsername}
          toWaitingRoom={(gameId: string) => {
            setGameId(gameId);
            setPage("waitingRoom");
          }}
          pages={filterPages([
            "New Game",
            "New Question",
            "New Questionnaire",
            "My Games",
            "Logout",
          ])}
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
          pages={filterPages(["Login", "Register"])}
        />
      )}
      {page === "registration" && (
        <Register
          token={token}
          onRegistrationSuccess={toLogin}
          onSignIn={toLogin}
          toMain={toMainPage}
          pages={filterPages(["Login", "Register"])}
        />
      )}
      {page === "createQuestion" && (
        <CreateQuestion
          token={token}
          toMain={toMainPage}
          username={loggedUsername}
          onSubmit={() => {}}
          pages={filterPages([
            "New Game",
            "New Question",
            "New Questionnaire",
            "My Games",
            "Logout",
          ])}
        />
      )}
      {page === "createQuestionaire" && (
        <CreateQuestionaire
          token={token}
          username={loggedUsername}
          toMain={toMainPage}
          pages={filterPages([
            "New Game",
            "New Question",
            "New Questionnaire",
            "My Games",
            "Logout",
          ])}
        />
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
          username={loggedUsername}
          pages={
            logged
              ? filterPages([
                  "New Game",
                  "New Question",
                  "New Questionnaire",
                  "My Games",
                  "Logout",
                ])
              : filterPages(["Login", "Register"])
          }
        />
      )}
      {page === "createGame" && (
        <CreateGame
          token={token}
          toMain={toMainPage}
          username={loggedUsername}
          pages={filterPages([
            "New Game",
            "New Question",
            "New Questionnaire",
            "My Games",
            "Logout",
          ])}
        ></CreateGame>
      )}
    </div>
  );
};
