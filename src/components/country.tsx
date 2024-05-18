import { Tile } from "../types";

export interface IProps {
  onClick: () => void;
  tile: Tile;
}

export const CountryComp = ({ onClick, tile }: IProps) => {
  return (
    <path
      onClick={onClick}
      id={tile.id}
      // data-name={country.name}
      d={tile.dimensions}
      strokeWidth={1.6}
      fill={
        tile.controllingGroup === 0
          ? "white"
          : tile.controllingGroup === 1
          ? "#1D24CA"
          : tile.controllingGroup === 2
          ? "#e63946"
          : tile.controllingGroup === 3
          ? "#66FF00"
          : tile.controllingGroup === 4
          ? "#FF00FF"
          : "black"
      }
    />
  );
};
