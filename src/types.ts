export enum CountryStatus {
  Normal = "Normal",
  Selected = "Selected",
  Conquered = "Conquered",
}

export interface Country {
  id: string;
  name: string;
  d: string;
  strokeWidth: number;
  fill: string;
  status: CountryStatus;
  controllingGroup?: number;
}

export interface MapViewSizes {
  height: string;
  width: string;
  viewBox: string;
}

export interface CountriesMap {
  name: string;
  countries: Country[];
  mapSizes: MapViewSizes;
}

export interface Token {
  AUTHORIZATION: string;
}

export interface Question {
  id: string;
  multipleChoice: boolean;
  question: string;
  answers: Answer[];
  incorrectAnswers: string[];
  difficulty: number;
  tags: string[];
  image: Uint8Array;
}

export interface Answer {
  id: string;
  answerText: string;
  correct: boolean;
}

export interface Questionnaire {
  id: string;
  name: string;
  questions: QuestionnaireQuestion[];
}

export interface Questionnaire_filter {
  id: string;
  name: string;
  creator: User;
  timeCreated: string;
  lastUpdated: string;
  shared: boolean;
  tags: string[];
  questions: string[];
}

export interface QuestionnaireQuestion {
  id: string;
  question: Question;
  difficultyLevel: number;
}

export interface User {
  id: string;
  name: string;
  password: string;
}

export interface Map {
  id: string;
  name: string;
  shared: boolean;
  tiles: Tile[];
}

export interface Game {
  id: string;
  name: string;
  host: User;
  status: string;
  timeCreated: string;
  timeLastUpdated: string;
  description: string;
  shared: boolean;
  configuration: GameConfiguration;
  tags: string[];
  map: flatMap;
  questionnaire: flatQuestionnaire;
  startingPositions: FlatTile[];
}

export interface GameLean {
  id: string;
  name: string;
  description: string;
  questionnaireName: string;
  mapName: string;
  numberOfGroups: number;
  status: string;
}

export interface flatMap {
  id: string;
  name: string;
}

export interface flatQuestionnaire {
  id: string;
  name: string;
}

export interface FlatTile {
  name: string;
  id: string;
}

export interface RunningTile {
  id: string;
  controllingGroup?: Group;
  tile: Tile;
  answeringPlayer?: MobilePlayer;
  activeQuestion?: Question;
  answeringGroup?: Group;
}

export interface Tile {
  id: string;
  name: string;
  tileType: string;
  difficultyLevel: number;
  dimensions: string;
  neighbors: NeighborTile[];
}


export interface NeighborTile {
  id: string;
  name: string;
  tileType: string;
  difficultyLevel: number;
  dimensions: string;
}

export interface Pages {
  [key: string]: () => void;
}

export interface Group {
  id: string;
  mobilePlayers: MobilePlayer[];
  number: number;
  score: number;
}

export interface GameConfiguration {
  canReconquerTiles: boolean;
  multipleQuestionsPerTile: boolean;
  simultaneousConquering: boolean;
  groupAssignmentProtocol: string;
  gameTime: number;
  numberOfGroups: number;
  questionTimeLimit: number;
}

export interface GameEvent {
  eventType: EventType;
  message: string;
  body: any;
  timestamp: Date;
  eventIndex: number;
}

export enum EventType {
  TILES_UPDATE,
  SCORE_UPDATE,
  END_GAME_UPDATE,
  WAITING_ROOM_UPDATE,
  CHEATING_PLAYER_UPDATE,
}

export interface RunningTileResponse {
  id: string;
  answeringGroupId: string;
  answeringPlayerId: string;
  controllingGroupId: string;
  activeQuestion: Question;
  numberOfCorrectAnswers: number;
}

export interface MapResponse {
  tiles: RunningTile[];
  eventIndex: number;
}

export interface PlayerStatistics {
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export interface RunningGameInstance {
  runningId: string;
  mobilePlayers: MobilePlayer[];
  groups: Group[];
  code: string;
  status: string;
  tiles: RunningTile[];
  playerStatistics: PlayerStatistics[];
  gameInstance: GameInstance;
}

export interface GameInstance {
  id: string;
  name: string;
  host: {
    id: string;
    name: string;
    password: string;
    permission: string;
  };
  questionnaire: {
    id: string;
    name: string;
    questions: object[][];
  };
  gameMap: {
    id: string;
    name: string;
  };
  description: string;
  shared: boolean;
  configuration: GameConfiguration;
}

// export interface MobilePlayer {
//   group: Group;
//   id: string;
//   name: string;
//   ready: boolean;
//   uuid: string;
// }

export interface MobilePlayer {
  id: string;
  name: string;
  group: {
    id: string;
    number: number;
    score: number;
  };
  ready: boolean;
  mobileUser: {
    id: string;
    userName: string;
    password: string;
  }
}

export interface CheatingPlayer {
  id: string;
  name: string;
  group: {
    id: string;
    number: number;
    score: number;
  }
  ready: boolean;
  mobileUser: {
    id: string;
    userName: string;
    password: string;
  }
}

export interface PostGameGroup {
  group: Group;
  place: number;
  color: string;
}

export interface ServerResponse<T> {
  error: boolean;
  message: string;
  status: number;
  successful: boolean;
  value: T;
}

export interface RunningGameLean {
  timePlayed: null | string,
  gameStatus: string,
  name: string,
  id: string,
  mapName: string,
  questionnaireName: string
}