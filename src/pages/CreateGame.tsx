import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Questionaire, Token, Map, Pages } from "../types";
import axios from "axios";
import { server } from "../main";

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  pages: Pages;
}

const CreateGame = ({ token, toMain, username, pages }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionnaire, setQuestionnaire] = useState<Questionaire>({
    id: "",
    name: "",
    questions: [],
  });
  const [questionnaires, setQuestionnaires] = useState<Questionaire[]>([]);
  const [filterQuestionaire, setFilterQuestionaire] = useState<string>("");
  const [map, setMap] = useState<Map>({
    id: "",
    name: "",
    statringPositions: [],
  });
  const [maps, setMaps] = useState<Map[]>([]);
  const [filterMap, setFilterMap] = useState<string>("");
  const [numberOfGroups, setNumGroups] = useState<number>(2);
  const [startingPositions, setStartingPositions] = useState<string[]>([]);

  const loadAllQuestionnaires = async () => {
    const url = `${server}/game/get_all_questionnaires`;
    await axios
      .get(url)
      .then((response) => setQuestionnaires(response.data))
      .catch((error) => alert(error));
  };

  const loadAllMaps = async () => {
    const url = `${server}/game/get_all_maps`;
    await axios
      .get(url)
      .then((response) => setMaps(response.data))
      .catch((error) => alert(error));
  };

  loadAllQuestionnaires();
  loadAllMaps();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStartingPositions(startingPositions.slice(0, numberOfGroups));
    // Additional validation can be added for other fields

    // Here you can implement logic for submitting the game creation form
    // For simplicity, let's just display a success message
    const headers = {
      Authorization: token.AUTHORIZATION,
    };
    try {
      const response = await axios.post(
        `${server}/game/add_game_instance`,
        {
          host: token.AUTHORIZATION,
          questionnaire: questionnaire,
          map: map,
          status: "ACTIVE",
          numberOfGroups: 3,
          name: "Sample Game",
          description: "This is a sample game instance.",
          groupAssignmentProtocol: "RANDOM",
          gameTime: 60,
          shared: true,
          questionTimeLimit: 30,
        },
        { headers }
      );
      // Handle the successful response
      alert("Response: " + response.data);
    } catch (error) {
      // Handle the error
      alert("Error: " + error);
    }
  };

  const handleBack = () => {
    toMain();
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.substring(0, 30));
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.substring(0, 200));
  };

  const onFilterQuestionaireChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterQuestionaire(e.target.value);
  };

  const onFilterMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMap(e.target.value);
  };

  const onStartingPositionsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setStartingPositions(
      startingPositions
        .slice(0, index)
        .concat(e.target.value)
        .concat(startingPositions.slice(index + 1))
    );
  };

  const titleCount = () => {
    const color = title.length === 30 ? "#dc2626" : "#8B4513";
    return (
      <div style={{ color: color, fontSize: "12px", fontWeight: 600 }}>
        {title.length}/30
      </div>
    );
  };

  const descriptionCount = () => {
    const color = description.length === 200 ? "#dc2626" : "#8B4513";
    return (
      <div style={{ color: color, fontSize: "12px", fontWeight: 600 }}>
        {description.length}/200
      </div>
    );
  };

  const showQuestionnaires = (qs: Questionaire[]) => {
    return (
      <select
        className="rounded-md h-10"
        value={questionnaire.id}
        onChange={(e) => {
          const Q = qs.find((q) => q.id === e.target.value);
          Q !== undefined && setQuestionnaire(Q);
        }}
      >
        <option value="">Select Questionaire</option>
        {qs
          .filter(
            (q) =>
              filterQuestionaire === "" ||
              q.name.toLowerCase().includes(filterQuestionaire.toLowerCase())
          )
          .map((q) => (
            <option value={q.id}>{q.name}</option>
          ))}
      </select>
    );
  };

  const showMaps = (ms: Map[]) => {
    return (
      <select
        className="rounded-md h-10"
        value={map.id}
        onChange={(e) => {
          const M = ms.find((m) => m.id === e.target.value);
          M !== undefined && setMap(M);
        }}
      >
        <option value="">Select Map</option>
        {ms
          .filter(
            (m) =>
              filterMap === "" ||
              m.name.toLowerCase().includes(filterMap.toLowerCase())
          )
          .map((m) => (
            <option value={m.id}>{m.name}</option>
          ))}
      </select>
    );
  };

  const startingPosition = (positions: string[], index: number) => {
    return (
      <div className="flex mb-2 items-center">
        <div className="mr-2 text-brown font-bold">{`Group ${index + 1}:`}</div>

        <select
          className="rounded-md h-10"
          value={startingPositions[index]}
          onChange={(e) => onStartingPositionsChange(e, index)}
        >
          <option value="">Select Starting Position</option>
          {positions.map((p) => (
            <option value={p}>{p}</option>
          ))}
        </select>
      </div>
    );
  };

  const questionnairesList = [
    "Adventure Questions",
    "Fantasy Lore",
    "Jungle Trivia",
    "Medieval History",
    "Western Trivia",
  ];
  const mapsList = [
    "Mystery Island",
    "Realm of Eldoria",
    "Amazon Rainforest",
    "Kingdom of Camelot",
    "Frontier Town",
  ];

  const SP = [
    "Pioneer's Junction",
    "Dusty Trail Tavern",
    "Prospectors' Ridge Camp",
    "Sheriff's Office Square",
    "Saloon Sunset View",
    "Outlaw's Hollow Hideaway",
  ];

  return (
    <Container page="New Game" pages={pages} username={username}>
      <div className="p-1 flex justify-end">
        <button
          className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
          type="button"
          onClick={handleBack}
        >
          <IoArrowForwardCircle />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">New Game</div>
          <div className="mb-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="text-lg text-brown font-bold">Title</div>
              <input
                className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Enter The Title"
                value={title}
                onChange={onTitleChange}
                required
              />
              {titleCount()}
            </div>
            <div className="mb-2">
              <div className="text-lg text-brown font-bold">Description</div>
              <textarea
                className="p-2.5 w-[100%] min-h-[100px] max-h-[100px] border-2 border-gray-300 rounded-md cursor-text"
                placeholder="Enter The Description"
                value={description}
                onChange={onDescriptionChange}
                required
              />
              {descriptionCount()}
              <div className="mb-2"></div>
              <div className="m-2"></div>
            </div>
            <div>
              <div className="mb-2 w-[60%]">
                <div className="text-lg text-brown font-bold mb-1">
                  Questionaire
                </div>
                <div className="flex">
                  <input
                    className="p-2.5 mr-2 w-[100%] h-10 border-2 border-gray-300 rounded-md"
                    type="text"
                    placeholder="Filter questionaires"
                    value={filterQuestionaire}
                    onChange={onFilterQuestionaireChange}
                  />
                  {showQuestionnaires(questionnaires)}
                </div>
              </div>
              <div className="mb-2 w-[60%]">
                <div className="text-lg text-brown font-bold mb-1">Map</div>
                <div className="flex">
                  <input
                    className="p-2.5 mr-2 w-[100%] h-10 border-2 border-gray-300 rounded-md"
                    type="text"
                    placeholder="Filter Maps"
                    value={filterMap}
                    onChange={onFilterMapChange}
                  />
                  {showMaps(maps)}
                </div>
              </div>
              <div className="mb-3 w-[60%]">
                <div className="text-lg text-brown font-bold mb-1">Groups</div>
                <select
                  className="rounded-md h-10"
                  value={numberOfGroups}
                  onChange={(e) => setNumGroups(parseInt(e.target.value))}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </div>
              <div className="mb-4 w-[60%]">
                <div className="text-lg text-brown font-bold mb-2">
                  Starting Positions
                </div>
                {Array.from({ length: numberOfGroups }).map((group, index) =>
                  startingPosition(map.statringPositions, index)
                )}
              </div>
            </div>
            <button
              className="p-2.5 bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              Create Game
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateGame;
