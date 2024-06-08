import { Tile, RunningTile, Group } from "../types";

export interface IProps {
  onClick: () => void;
  tile: RunningTile;
}

export const CountryComp = ({ onClick, tile }: IProps) => {
  return (
    <path
      id={tile.id}
      // data-name={country.name}
      d={tile.tile.dimensions}
      strokeWidth={1.6}
      fill={
        tile.tile.tileType === "SEA"
          ? "teal"
          : tile.tile.tileType === "NEUTRAL"
          ? "grey"
          : tile.controllingGroup.number === 0
          ? "white"
          : tile.controllingGroup.number === 1
          ? "#1D24CA"
          : tile.controllingGroup.number === 2
          ? "#e63946"
          : tile.controllingGroup.number === 3
          ? "#66FF00"
          : tile.controllingGroup.number === 4
          ? "#FF00FF"
          : tile.controllingGroup.number === 5
          ? "#481E14"
          : "black"
      }
    />
  );
};
