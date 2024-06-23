import Container from "../components/container.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Token } from "../types";
import { westUsaMap } from "../maps/westUsaMap";

export interface IProps {
  runningGameId: string;
  toMain: () => void;
  token: Token;
  postGame: () => void;
}

export const RunningGame = ({
  runningGameId,
  toMain,
  token,
  postGame,
}: IProps) => {
  return (
    <Container page="" pages={{}} username={undefined}>
      <CountriesMapComp
        runningGameId={runningGameId}
        countriesMap={westUsaMap}
        toMain={toMain}
        token={token}
        postGame={postGame}
      ></CountriesMapComp>
    </Container>
  );
};
