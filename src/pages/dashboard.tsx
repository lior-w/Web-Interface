import { useRef, useState } from "react";
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
import {
  Token,
  Game,
  Questionnaire,
  Pages,
  RunningGameInstance,
  Group,
} from "../types";
import { server } from "../main";
import { PostGame } from "./PostGame";
import { Stats } from "./Stats";

export const filterPages: (pages: Pages, pageNames: string[]) => Pages = (
  pages: Pages,
  pageNames: string[]
) => {
  const newPages: Pages = {};
  Object.keys(pages).forEach((page) => {
    if (pageNames.includes(page)) newPages[page] = pages[page];
  });
  return newPages;
};

export const Dashboard = () => {
  const [page, setPage] = useState<string>("main");
  const [token, setToken] = useState<Token>({ AUTHORIZATION: "" });
  const [gameId, setGameId] = useState<string>("");
  const [runningGameId, setRunningGameId] = useState<string>("");
  const [runningGameGroups, setRunningGameGroups] = useState<Group[]>([]);
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

  const toPostGame = () => setPage("postGame");

  const toMainPage = () => setPage("main");

  const toStats = () => setPage("stats");

  const toLogout = () => {
    setLogged(false);
    setLoggedUsername(undefined);
    setPage("main");
  };

  const pages: Pages = {
    Main: toMainPage,
    Login: toLogin,
    Register: toRegistration,
    "New Question": toCreateQuestion,
    "New Questionnaire": toCreateQuestionaire,
    "New Game": toCreateGame,
    Games: toSavedGames,
    // Stats: toStats,
    "Post Game": toPostGame,
    "Waiting Room": toWaitingRoom,
    "Running Game": toRunningGame,
    Logout: toLogout,
  };

  return (
    <div>
      {page === "runningGame" && (
        <RunningGame
          runningGameId={runningGameId}
          groups={runningGameGroups}
          setGroups={(groups: Group[]) => setRunningGameGroups(groups)}
          token={token}
          username={loggedUsername}
          pages={filterPages(pages, ["Main", "Post Game"])}
        ></RunningGame>
      )}
      {page === "savedGames" && (
        <SavedGames
          token={token}
          username={loggedUsername}
          setGameId={setGameId}
          pages={pages}
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
          pages={filterPages(pages, ["Main", "Login", "Register"])}
        />
      )}
      {page === "registration" && (
        <Register
          token={token}
          pages={filterPages(pages, ["Main", "Login", "Register"])}
        />
      )}
      {page === "createQuestion" && (
        <CreateQuestion
          token={token}
          username={loggedUsername}
          pages={filterPages(pages, [
            "Main",
            "New Game",
            "New Question",
            "New Questionnaire",
            "Games",
            // "Stats",
            "Logout",
          ])}
        />
      )}
      {page === "createQuestionaire" && (
        <CreateQuestionaire
          token={token}
          username={loggedUsername}
          pages={filterPages(pages, [
            "Main",
            "New Game",
            "New Question",
            "New Questionnaire",
            "Games",
            // "Stats",
            "Logout",
          ])}
        />
      )}
      {page === "waitingRoom" && (
        <WaitingRoom
          token={token}
          username={loggedUsername}
          setRunningGameId={setRunningGameId}
          setGroups={(groups: Group[]) => setRunningGameGroups(groups)}
          gameId={gameId}
          pages={filterPages(pages, ["Main", "Running Game"])}
        />
      )}

      {page === "main" && (
        <MainPage
          token={token}
          username={loggedUsername}
          pages={
            logged
              ? filterPages(pages, [
                  "Main",
                  "New Game",
                  "New Question",
                  "New Questionnaire",
                  "Games",
                  // "Stats",
                  "Logout",
                ])
              : filterPages(pages, ["Main", "Login", "Register"])
          }
        />
      )}
      {page === "createGame" && (
        <CreateGame
          token={token}
          username={loggedUsername}
          pages={filterPages(pages, [
            "Main",
            "New Game",
            "New Question",
            "New Questionnaire",
            "Games",
            // "Stats",
            "Logout",
          ])}
        ></CreateGame>
      )}
      {page === "postGame" && (
        <PostGame
          token={token}
          username={loggedUsername}
          runningGameId={runningGameId}
          groups={runningGameGroups}
          pages={filterPages(pages, ["Main"])}
        ></PostGame>
      )}
      {/* {page === "stats" && (
        <Stats
          token={token}
          username={loggedUsername}
          pages={filterPages(pages, ["Main"])}
        ></Stats>
      )} */}
    </div>
  );
};
