import React, { useEffect, useMemo, useState } from "react";
import {
  Map,
  Question,
  Questionnaire,
  RunningTile,
  Tile,
  Token,
} from "../types";
import { FlatCountry } from "./flatCountry";

export interface IProps {
  handleChangeInPage: (selected: string[]) => void;
  selectedMap: Map | undefined;
  selectedTiles_: string[];
  numberOfGroups: number;
  token: Token;
}

export const SelectStartingPositions = ({
  handleChangeInPage,
  selectedMap,
  selectedTiles_,
  numberOfGroups,
  token,
}: IProps) => {
  const [selectedTiles, setSelectedTiles] = useState<string[]>(selectedTiles_);

  const changeSelect = (index: number, tileId: string) => {
    return selectedTiles
      .slice(0, index)
      .concat(tileId)
      .concat(selectedTiles.slice(index + 1));
  };

  const handleChangeSelectedStartingPositions = (selected: string[]) => {
    setSelectedTiles(selected);
    handleChangeInPage(selected);
  };

  /*
  useEffect(() => {
    if (selectedMap?.tiles) {
      const initialTileToGroup = selectedMap.tiles.reduce((acc, tile) => {
        acc[tile.id] = 0;
        return acc;
      }, {} as { [key: string]: number });
      setTileToGroup(initialTileToGroup);
    }
  }, [selectedMap]);
  */

  const handleClick = (tileId: string) => {
    let group = selectedTiles.findIndex((t) => t === tileId);
    if (group !== -1) {
      handleChangeSelectedStartingPositions(changeSelect(group, ""));
    } else {
      group = selectedTiles.findIndex((t, i) => i < numberOfGroups && t === "");
      group !== -1 &&
        handleChangeSelectedStartingPositions(changeSelect(group, tileId));
    }
  };

  const color = (tileId: string) => {
    return (
      selectedTiles.findIndex((t, i) => i < numberOfGroups && t === tileId) +
        1 || 0
    );
  };

  return (
    <div>
      <svg
        className=" max-h-[800px] border-1 border-brown rounded-lg"
        height={"auto"}
        viewBox={"350 -20 400 600"}
        width={"auto"}
        id="svg"
        strokeLinejoin="round"
        stroke="#000"
        fill="none"
      >
        {selectedMap !== undefined &&
          selectedMap.tiles.map((tile) => (
            <FlatCountry
              tile={useMemo(() => tile, [])}
              group={color(tile.id)}
              onClick={() => {
                handleClick(tile.id);
              }}
            />
          ))}
      </svg>
      <div className="flex justify-end text-lg text-brown">{`${
        selectedTiles.filter((t) => t !== "").length
      }/${numberOfGroups}`}</div>
    </div>
  );
};
