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
  map: flatMap;
  questionnaire: flatQuestionnaire;
  startingPositions: FlatTile[];
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
  tile: Tile;
  controllingGroup: Group;
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