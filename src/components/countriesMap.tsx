import * as React from "react";
import { useEffect, useState } from "react";
import { CountriesMap, Country, CountryStatus, Tile, Token } from "../types";
import { CountryComp } from "./country";
import Container from "./container";
import axios from "axios";

export interface IProps {
  countriesMap: CountriesMap;
  gameRunningId: string;
  token: Token;
}

export const CountriesMapComp = ({
  countriesMap,
  gameRunningId,
  token,
}: IProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  const getMapChanges = async () => {
    await axios
      .get(`http://localhost:8080/running_game/refresh_map/${gameRunningId}`, {
        headers: { Authorization: token.AUTHORIZATION },
      })
      .then((res) => {
        setTiles(res.data.value.tiles);
      })
      .catch((err) => console.log(err));
  };

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

  return (
    <>
      <Container w="auto" h="auto">
        <div className="border-1 border-black flex flex-col items-center">
          <div className="text-brown text-6xl text-center font-bold p-8">
            {countriesMap.name}
          </div>

          <svg
            className="p-8 max-w-[1000px] border-1"
            height={"85%"}
            viewBox={"150 30 490 520"}
            width={"95%"}
            id="svg"
            strokeLinejoin="round"
            stroke="#000"
            fill="none"
          >
            {Object.entries(tiles).map(([key, tile]) => (
              <CountryComp key={key} tile={tile} onClick={() => {}} />
            ))}
          </svg>
        </div>
      </Container>
    </>
  );
};
