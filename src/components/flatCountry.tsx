import { Tile } from "../types";

export interface IProps {
  onClick: () => void;
  group: number;
  tile: Tile;
}

export const FlatCountry = ({ onClick, group, tile }: IProps) => {
  return (
    <path
      onClick={onClick}
      id={tile.id}
      // data-name={country.name}
      d={tile.dimensions}
      strokeWidth={1.6}
      fill={
        group === 0
          ? "white"
          : group === 1
          ? "#1D24CA"
          : group === 2
          ? "#e63946"
          : group === 3
          ? "#66FF00"
          : group === 4
          ? "#FF00FF"
          : group === 5
          ? "#481E14"
          : "black"
      }
    />
  );
};
