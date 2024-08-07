import { useState, useEffect } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import axios from "axios";
import { Group, Pages, Token } from "../types";
import Loading from "../components/loading";
import { server } from "../main";

export interface IProps {
  token: Token;
  username: string | undefined;
  setRunningGameId: (runningGameId: string) => void;
  setGroups: (groups: Group[]) => void;
  gameId: string | undefined;
  pages: Pages;
}

export const WaitingRoom = ({
  token,
  username,
  setRunningGameId,
  setGroups,
  gameId,
  pages,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [startingGame, setStartingGame] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");
  const [runningId, setRunningId] = useState<string>("");
  const [gameCode, setGameCode] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [playersLoad, setPlayersLoad] = useState<boolean>(false);

  const openWaitingRoom = async () => {
    const data = {
      gameId: gameId,
      userId: token.AUTHORIZATION,
    };
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    const url = `${server}/running_game/open_waiting_room`;
    await axios
      .post(url, data, { headers })
      .then((response) => {
        console.log(response.data);
        setGameName(response.data.value.name);
        setGameCode(response.data.value.code);
        setRunningId(response.data.value.runningId);
        setLoading(false);
        setPlayersLoad(!playersLoad);
      })
      .catch((e) => alert(e));
  };

  const getPlayers = async () => {
    console.log(players);
    const url = `${server}/running_game/get_lean_running_game_instance/${runningId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        setPlayers(
          response.data.value.mobilePlayers.map((p: { name: string }) => p.name)
        );
        setGroups(response.data.value.groups);
      })
      .catch((error) => alert(error))
      .finally(() => setPlayersLoad(!playersLoad));
  };

  useEffect(() => {
    openWaitingRoom();
  }, []);

  // useEffect(() => {
  //   runningId !== "" && !startingGame && setTimeout(getPlayers, 1000);
  // }, [playersLoad]);

  useEffect(() => {
    if (runningId === "" || startingGame) {
      // Return early if the condition to not run the effect is met
      return;
    }

    // The effect logic here
    const timeoutId = setTimeout(getPlayers, 1000);

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timeoutId);
  }, [playersLoad, runningId, startingGame]);

  const startGame = async () => {
    setStartingGame(true);
    const headers = {
      Authorization: token.AUTHORIZATION,
    };
    const data = {
      gameId: runningId,
    };
    const url = `${server}/running_game/start_game`;
    await axios
      .post(url, data, { headers })
      .then((response) => console.log(response.data))
      .catch((e) => alert(e));

    if (runningId) {
      setRunningGameId(runningId);
      pages["Running Game"]();
    }
  };

  return (
    <Container page="" pages={pages} username={username}>
      {!startingGame && (
        <div className="p-4">
          <div className="border-1 border-black rounded-lg items-center justify-center backdrop-blur-xl brightness-110">
            {loading && (
              <Loading size={60} msg="Loading Waiting Room"></Loading>
            )}
            {!loading && (
              <div>
                <div className="flex flex-row">
                  <div className="p-4  w-[100%] flex flex-col">
                    <div className="text-4xl text-black font-bold mb-3">{`${gameName} - Waiting Room`}</div>
                  </div>
                </div>
                <div className="flex p-8 text-black text-6xl font-bold justify-center">{`Game Code: ${gameCode}`}</div>
                <div className="p-4 text-black text-4xl">Players:</div>
                <div className="p-4 text-2xl text-black flex flex-wrap ">
                  {players.map(
                    (p) => p && <div className="m-[20px]" key={p}>{`${p}`}</div>
                  )}
                </div>
                <div className="flex p-2 justify-center items-center">
                  <button
                    className="p-2.5 w-[300px] bg-blue-600 text-xl text-white hover:bg-blue-800 rounded-lg cursor-pointer"
                    type="button"
                    onClick={startGame}
                  >
                    START GAME
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {startingGame && <Loading size={60} msg="Starting Game"></Loading>}
    </Container>
  );
};
