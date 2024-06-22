import React, { useState, useEffect } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import axios from "axios";
import { Game, Token } from "../types";
import Loading from "../components/loading";
import { server } from "../main";

export interface IProps {
  token: Token;
  toMain: () => void;
  toGame: (runningGameId: string) => void;
  gameId: string | undefined;
}

export const WaitingRoom = ({ token, toMain, toGame, gameId }: IProps) => {
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
      .then((response) =>
        setPlayers(
          response.data.value.mobilePlayers.map((p: { name: string }) => p.name)
        )
      )
      .catch((error) => alert(error))
      .finally(() => setPlayersLoad(!playersLoad));
  };

  useEffect(() => {
    openWaitingRoom();
  }, []);

  useEffect(() => {
    runningId !== "" && !startingGame && setTimeout(getPlayers, 1000);
  }, [playersLoad]);

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

    runningId && toGame(runningId);
  };

  return (
    <Container page="" pages={{}} username={undefined}>
      {!startingGame && (
        <div>
          <div className="p-1 flex justify-end">
            <button
              className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
              type="button"
              onClick={toMain}
            >
              <IoArrowForwardCircle />
            </button>
          </div>
          {loading && <Loading size={60} msg="Loading Waiting Room"></Loading>}
          {!loading && (
            <div>
              <div className="flex flex-row">
                <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
                  <div className="text-4xl text-brown font-bold mb-3">{`${gameName} - Waiting Room`}</div>
                </div>
              </div>
              <div className="flex p-8 text-brown text-6xl font-bold justify-center">{`Game Code: ${gameCode}`}</div>
              <div className="p-4 text-brown text-4xl">Players:</div>
              <div className="p-4 text-2xl text-brown flex flex-wrap ">
                {players.map(
                  (p) => p && <div className="m-[20px]" key={p}>{`${p}`}</div>
                )}
              </div>
              <button
                className="p-2.5 w-[100%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                type="button"
                onClick={startGame}
              >
                START GAME
              </button>
            </div>
          )}
        </div>
      )}
      {startingGame && <Loading size={60} msg="Starting Game"></Loading>}
    </Container>
  );
};
