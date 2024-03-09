import * as React from "react";
import { useState } from "react";
import { CountriesMap, Country, CountryStatus } from "../types";
import { CountryComp } from "./country";
import Container from "./container";

export interface IProps {
  countriesMap: CountriesMap;
}

export const CountriesMapComp = ({ countriesMap }: IProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  const [countryData, setCountryData] = useState<Country[]>(
    countriesMap.countries
  );

  const handleCountryPress = (country: Country) => {
    //setShowQuestion(true);
    //setSelectedCountry(country);
    console.log(country.name);
  };

  const handleAnswerRight = (country: Country) => {
    const newCountry = { ...country, status: CountryStatus.Selected };
    const newCountryData = [
      ...countryData.filter((c) => c.id !== country.id),
      newCountry,
    ];
    setCountryData(newCountryData);
    setShowQuestion(false);
  };

  const handleAnswerFalse = () => {
    setShowQuestion(false);
  };

  return (
    <>
      {!showQuestion && (
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
              {countryData.map((country) => (
                <CountryComp
                  key={country.id}
                  country={country}
                  onClick={() => handleCountryPress(country)}
                />
              ))}
            </svg>
          </div>
        </Container>
      )}
    </>
  );
};
