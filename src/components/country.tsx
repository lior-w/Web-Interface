import { Country } from "../types";

export interface IProps {
  onClick: () => void;
  country: Country;
}

export const CountryComp = ({ onClick, country }: IProps) => {
  return (
    <path
      id={country.id}
      onClick={onClick}
      data-name={country.name}
      d={country.d}
      strokeWidth={1.6}
      fill={
        country.status === "Normal"
          ? "white"
          : country.status === "Selected"
          ? "#1D24CA"
          : "black"
      }
    />
  );
};
