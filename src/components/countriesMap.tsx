import { useEffect, useState } from "react";
import { CountriesMap, Token, RunningTile, Pages } from "../types";
import { CountryComp } from "./country";
import axios from "axios";
import Loading from "./loading";
import { server } from "../main";
import { PostGame } from "../pages/PostGame";

const REFRESH_TIME = 1000;
const GAME_TIME = 1000 * 60 * 45;

export interface IProps {
  countriesMap: CountriesMap;
  runningGameId: string;
  token: Token;
  pages: Pages;
}

export const CountriesMapComp = ({
  countriesMap,
  runningGameId,
  token,
  pages,
}: IProps) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [runningTiles, setRunningTiles] = useState<RunningTile[]>([]);
  const [myInterval, setMyInterval] = useState<any>();

  const getMapChanges = async () => {
    const url = `${server}/running_game/refresh_map/runningGameId=${runningGameId}&userId=${token.AUTHORIZATION}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        setRunningTiles(response.data.value);
        !mapLoaded && setMapLoaded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let load = false;
    setMyInterval(
      setInterval(async () => {
        if (!load) {
          load = true;
          await getMapChanges().finally(() => (load = false));
        }
      }, REFRESH_TIME)
    );
  }, []);

  const endGame = async () => {
    clearInterval(myInterval);
    const url = `${server}/running_game/end_game`;
    const params = { gameId: runningGameId };
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .post(url, params, { headers })
      .then(() => {
        alert("End of the game");
        pages["Post Game"]();
      })
      .catch((error) => alert(error));
  };

  setTimeout(endGame, GAME_TIME);
  /*
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    const id = setInterval(getMapChanges, 1000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    startInterval();
  }, []);
*/
  return (
    <div>
      {!mapLoaded && (
        <Loading msg={`Loading Map: ${countriesMap.name}`} size={60}></Loading>
      )}
      {mapLoaded && (
        <div className="flex flex-col">
          <div className="p-2 flex justify-start">
            <button
              className="text-xl text-brown font-bold cursor-pointer hover:text-amber-700"
              type="button"
              onClick={endGame}
            >
              End Game
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-brown text-6xl text-center font-bold p-8">
              {countriesMap.name}
            </div>
            <svg
              className="p-8 max-h-[800px]"
              height={"75%"}
              viewBox={"350 -20 400 600"}
              width={"85%"}
              id="svg"
              strokeLinejoin="round"
              stroke="#000"
              fill="none"
            >
              {Object.entries(runningTiles).map(([key, runningTile]) => (
                <CountryComp key={key} tile={runningTile} onClick={() => {}} />
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
