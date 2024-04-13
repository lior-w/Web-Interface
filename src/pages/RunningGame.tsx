import React, { useState } from "react";
import Container from "../components/container.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Token, Game, Questionaire } from "../types";
import { westUsaMap } from "../maps/westUsaMap";

export interface IProps {
  runningGameId: string;
  token: Token;
}

export const RunningGame = ({ runningGameId, token }: IProps) => {
  return (
    <Container w="auto" h="auto">
      <CountriesMapComp
        runningGameId={runningGameId}
        countriesMap={westUsaMap}
        token={token}
      ></CountriesMapComp>
    </Container>
  );
};
