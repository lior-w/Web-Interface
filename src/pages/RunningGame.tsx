import Container from "../components/container.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Pages, RunningGameInstance, Token } from "../types";
import { westUsaMap } from "../maps/westUsaMap";

export interface IProps {
  runningGameId: string;
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const RunningGame = ({
  runningGameId,
  token,
  username,
  pages,
}: IProps) => {
  return (
    <Container page={""} pages={pages} username={username}>
      <CountriesMapComp
        runningGameId={runningGameId}
        countriesMap={westUsaMap}
        token={token}
        pages={pages}
      ></CountriesMapComp>
    </Container>
  );
};
