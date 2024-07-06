import Container from "../components/container.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Pages, Token } from "../types";
import { westUsaMap } from "../maps/westUsaMap";

export interface IProps {
  runningGameId: string;
  token: Token;
  pages: Pages;
}

export const RunningGame = ({ runningGameId, token, pages }: IProps) => {
  return (
    <Container page="" pages={{}} username={undefined}>
      <CountriesMapComp
        runningGameId={runningGameId}
        countriesMap={westUsaMap}
        token={token}
        pages={pages}
      ></CountriesMapComp>
    </Container>
  );
};
