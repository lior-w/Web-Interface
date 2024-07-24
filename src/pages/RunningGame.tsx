import Container from "../components/container.tsx";
import { CountriesMapComp } from "../components/countriesMap";
import { Group, Pages, RunningGameInstance, Token } from "../types";
import { westUsaMap } from "../maps/westUsaMap";

export interface IProps {
  runningGameId: string;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const RunningGame = ({
  runningGameId,
  groups,
  setGroups,
  token,
  username,
  pages,
}: IProps) => {
  return (
    <Container page={""} pages={pages} username={username}>
      <CountriesMapComp
        runningGameId={runningGameId}
        groups={groups}
        setGroups={setGroups}
        countriesMap={westUsaMap}
        token={token}
        pages={pages}
      ></CountriesMapComp>
    </Container>
  );
};
