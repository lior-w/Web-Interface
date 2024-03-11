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
  answer: string;
  incorrectAnswers: string[];
  difficulty: number;
  tags: string[];
}

export interface Questionaire {
  id: string;
  name: string;
  questions: Question[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  permissions: string;
}

export interface Map {
  id: string;
  name: string;
  statringPositions: string[];
}

export interface Game {
  id: string;
  name: string;
  host: User;
  description: string;
  questionnaire: Questionaire;
  map: Map;
  numberOfGroups: number;
  status: string;
  groupAssignmentProtocol: string;
  gameTime: number;
  questionTimeLimit: number;
  shared: boolean;
  runningId: string;
  tiles: Tile[];
}

export interface Tile {
  id: string;
  dimensions: string;
  tileType: string;
  controllingGroup: number;
  difficultyLevel: number;
}
