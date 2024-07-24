import { useCallback, useEffect, useRef, useState } from "react";
import {
  CountriesMap,
  Token,
  RunningTile,
  Pages,
  EventType,
  RunningTileResponse,
  RunningGameInstance,
  GameEvent,
  Group,
  MobilePlayer,
  CheatingPlayer,
} from "../types";
import { CountryComp } from "./country";
import axios from "axios";
import Loading from "./loading";
import { server } from "../main";
import { PostGame } from "../pages/PostGame";
import EventHandler from "./eventHandler";

const REFRESH_TIME = 1000;
const GAME_TIME = 1000 * 60 * 45;

export interface IProps {
  countriesMap: CountriesMap;
  runningGameId: string;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  token: Token;
  pages: Pages;
}

export const CountriesMapComp = ({
  countriesMap,
  runningGameId,
  groups,
  setGroups,
  token,
  pages,
}: IProps) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  // const [runningTiles, setRunningTiles] = useState<RunningTile[]>([]);
  const [mapRunningTiles, setMapRunningTiles] = useState<{
    [key: string]: RunningTile;
  }>({});
  const [gameGroups, setGameGroups] = useState<Group[]>(groups);
  const [cheatingPlayers, setCheatingPlayers] = useState<CheatingPlayer[]>([]);
  const indexRef = useRef(0); // Use ref to keep track of the latest index value
  const eventHandler = EventHandler.getInstance();
  const mapRef = useRef(mapRunningTiles);
  // const [myInterval, setMyInterval] = useState<any>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const gameInstance = useRef<RunningGameInstance>();

  const startInterval = (initialIndex: number) => {
    indexRef.current = initialIndex; // Ensure the ref is updated with the initial index
    const id = setInterval(() => getEvents(indexRef.current), 1000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleScoreUpdate = (group: Group) => {
    const updatedGroups = gameGroups
      .filter((g) => g.id != group.id)
      .concat(group);
    setGameGroups(updatedGroups);
  };

  const handleCheatPlayer = (cheatPlayer: CheatingPlayer) => {
    setCheatingPlayers(cheatingPlayers.concat(cheatPlayer));
    setTimeout(
      () =>
        setCheatingPlayers(
          cheatingPlayers.filter((p) => p.id !== cheatPlayer.id)
        ),
      10000
    );
  };

  useEffect(() => {
    mapRef.current = mapRunningTiles;
  }, [mapRunningTiles]);

  const fetchGameInstance = async () => {
    const url = `${server}/running_game/get_running_game/${runningGameId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then(({ data }) => {
        gameInstance.current = data.value;
        console.log(`data.value:  ${data.value}`);
        console.log(`game instance: ${gameInstance.current}`);
        eventHandler.subscribe(
          EventType[EventType.TILES_UPDATE],
          (updatedTile: any) =>
            handleRunningTileUpdate(updatedTile, setMapRunningTiles)
        );
        eventHandler.subscribe(
          EventType[EventType.SCORE_UPDATE],
          (updatedGroup: Group) => handleScoreUpdate(updatedGroup)
        );
        eventHandler.subscribe(
          EventType[EventType.CHEATING_PLAYER_UPDATE],
          (cheatPlayer: any) => handleCheatPlayer(cheatPlayer)
        );

        getMapChanges();
      })
      .catch((err) => console.log(err));
  };

  const fetchGroups = async () => {
    const url = `${server}/running_game/get_lean_running_game_instance/${runningGameId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => setGameGroups(response.data.value.groups))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    console.log(`game started groups: ${gameGroups}`);
    // fetchGroups();
    fetchGameInstance();
    // Cleanup subscription on unmount
    return () => {
      eventHandler.unsubscribe(
        EventType[EventType.TILES_UPDATE],
        (updatedTile: any) =>
          handleRunningTileUpdate(updatedTile, setMapRunningTiles)
      );
      stopInterval();
    };
  }, []);

  const handleRunningTileUpdate = (
    updatedRunningTile: RunningTileResponse,
    setMap: (runningTiles: { [key: string]: RunningTile }) => void
  ) => {
    console.log(`Game instance: ${gameInstance.current}`);
    console.log(
      `Game instance groups: ${
        gameInstance.current && gameInstance.current.groups
      }`
    );
    console.log("updated running tile:", updatedRunningTile);
    console.log(Object.keys(mapRef.current));
    const findRunningTile = mapRef.current[updatedRunningTile.id];
    console.log("find running tile:", findRunningTile);
    // console.log(
    //   `matching ids:  ${updatedRunningTile.id === findRunningTile.id}`
    // );
    const newRunningTile: RunningTile = {
      id: updatedRunningTile.id,
      controllingGroup:
        gameInstance.current &&
        gameInstance.current.groups.find(
          (group: Group) =>
            updatedRunningTile &&
            group.id === updatedRunningTile.controllingGroupId
        ),
      // updatedRunningTile.controllingGroupId
      // ? gameInstance.current &&
      //   gameInstance.current.groups.find(
      //     (group) => group.id === updatedRunningTile.controllingGroupId
      //   )
      // : undefined,
      answeringGroup: updatedRunningTile.answeringGroupId
        ? gameInstance.current &&
          gameInstance.current.groups.find(
            (group: Group) => group.id === updatedRunningTile.answeringGroupId
          )
        : undefined,
      answeringPlayer: updatedRunningTile.answeringPlayerId
        ? gameInstance.current &&
          gameInstance.current.mobilePlayers.find(
            (player: MobilePlayer) =>
              player.id === updatedRunningTile.answeringPlayerId
          )
        : undefined,
      activeQuestion: updatedRunningTile.activeQuestion,
      tile: findRunningTile.tile,
    };
    const updatedRunningTiles = { ...mapRef.current };
    updatedRunningTiles[updatedRunningTile.id] = newRunningTile;
    setMap(updatedRunningTiles);
    console.log("mapRunningTiles:", mapRunningTiles);
  };

  const getEvents = useCallback(
    async (currentIndex: number) => {
      console.log("index", currentIndex);
      let eventIndex = currentIndex;
      const url = `${server}/event/get_events/${runningGameId}/index/${eventIndex}`;
      const headers = { AUTHORIZATION: token.AUTHORIZATION };
      await axios
        .get(url, { headers })
        .then(({ data }) => {
          if (data.value && data.value.length > 0) {
            console.log("event list length: ", data.value.length);
            console.log("event index: ", eventIndex);
            console.log("events: ", data.value);
            data.value.forEach((event: GameEvent) => {
              if (event.eventIndex > eventIndex) eventIndex = event.eventIndex;
              eventHandler.publish(event.eventType.toString(), event.body);
            });
            console.log("Before updating indexRef", indexRef.current);
            indexRef.current = eventIndex + 1;
            console.log("After updating indexRef", indexRef.current);
          }
        })
        .catch((err) => console.log(err));
    },
    [token, runningGameId, eventHandler, mapRunningTiles]
  );

  const getMapChanges = async () => {
    const url = `${server}/running_game/refresh_map/runningGameId=${runningGameId}&userId=${token.AUTHORIZATION}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then(({ data }) => {
        const tiles = data.value.tiles.reduce(
          (
            acc: {
              [key: string]: RunningTile;
            },
            tile: RunningTile
          ) => {
            acc[tile.id] = tile;
            return acc;
          },
          {}
        );
        setMapRunningTiles(tiles);
        !mapLoaded && setMapLoaded(true);
        indexRef.current = data.value.eventIndex;
        startInterval(data.value.eventIndex); // Start interval with the initial event index
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   let load = false;
  //   setMyInterval(
  //     setInterval(async () => {
  //       if (!load) {
  //         load = true;
  //         await getMapChanges().finally(() => (load = false));
  //       }
  //     }, REFRESH_TIME)
  //   );
  // }, []);

  const endGame = async () => {
    intervalId !== null && clearInterval(intervalId);
    const url = `${server}/running_game/end_game`;
    const params = { gameId: runningGameId };
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .post(url, params, { headers })
      .then(() => {
        gameGroups.forEach((g) => `group ${g.number} score: ${g.score}`);
        setGroups(gameGroups);
        alert("End of the game");
        pages["Post Game"]();
      })
      .catch((error) => alert(error));
  };

  setTimeout(endGame, GAME_TIME);
  /*
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    const id = setInterval(getMapChanges, 1000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    startInterval();
  }, []);
*/
  const showScoreBoard = () => {
    return <div className=""></div>;
  };

  return (
    <div>
      {!mapLoaded && (
        <Loading msg={`Loading Map: ${countriesMap.name}`} size={60}></Loading>
      )}
      {mapLoaded && (
        <div className="flex flex-col border-1 border-black rounded-lg items-center justify-center backdrop-blur-xl brightness-110">
          <div className="p-2 flex justify-start">
            <button
              className="text-xl text-blue-600 font-bold cursor-pointer hover:text-blue-800"
              type="button"
              onClick={endGame}
            >
              End Game
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-blue-600 text-6xl text-center font-bold p-8">
              {countriesMap.name}
            </div>
            <div>
              {cheatingPlayers.map((p) => (
                <div className="text-[30px] text-red-600">{`${p.name} has left the application!`}</div>
              ))}
            </div>
            <svg
              className="p-8 max-h-[800px] min-w-[1200px] bg-blue-400 border-2 border-blue-600 rounded-md mb-4"
              height={"75%"}
              viewBox={"350 -20 400 600"}
              width={"85%"}
              id="svg"
              strokeLinejoin="round"
              stroke="#000"
              fill="none"
            >
              {Object.entries(mapRunningTiles).map(([key, runningTile]) => (
                <CountryComp key={key} tile={runningTile} onClick={() => {}} />
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
