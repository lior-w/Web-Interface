import React, { useState } from "react";
import Container from "../components/container_.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Token, Game, Questionnaire } from "../types";
import { westUsaMap } from "../maps/westUsaMap";
import { server } from "../main";

export interface IProps {
  runningGameId: string;
  toMain: () => void;
  token: Token;
}

export const RunningGame = ({ runningGameId, toMain, token }: IProps) => {
  return (
    <Container page="" pages={{}} username={undefined}>
      <CountriesMapComp
        runningGameId={runningGameId}
        countriesMap={westUsaMap}
        toMain={toMain}
        token={token}
      ></CountriesMapComp>
    </Container>
  );
};
