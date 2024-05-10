import * as React from "react";
import { useEffect, useState } from "react";
import {
  CountriesMap,
  Country,
  CountryStatus,
  Tile,
  Token,
  RunningTile,
} from "../types";
import { CountryComp } from "./country";
import Container from "./container";
import axios from "axios";
import Loading from "./loading";
import { server } from "../main";

const REFRESH_TIME = 1000;
const GAME_TIME = 1000 * 60 * 45;

export interface IProps {
  countriesMap: CountriesMap;
  runningGameId: string;
  token: Token;
}

export const CountriesMapComp = ({
  countriesMap,
  runningGameId,
  token,
}: IProps) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [runningTiles, setRunningTiles] = useState<RunningTile[]>([]);
  const [myInterval, setMyInterval] = useState<any>();

  const url = `${server}/running_game/refresh_map/runningGameId=${runningGameId}&userId=${token.AUTHORIZATION}`;

  const getMapChanges = async () => {
    await axios
      .get(url)
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

  const endGame = () => {
    clearInterval(myInterval);
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
        <Loading msg={`Loading Map: ${countriesMap.name}`}></Loading>
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
              viewBox={"150 30 490 520"}
              width={"85%"}
              id="svg"
              strokeLinejoin="round"
              stroke="#000"
              fill="none"
            >
              {Object.entries(
                runningTiles.map((runningTile) => {
                  const t: Tile = runningTile.tile;
                  t.controllingGroup = runningTile.controllingGroup;
                  return t;
                })
              ).map(([key, tile]) => (
                <CountryComp key={key} tile={tile} onClick={() => {}} />
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
