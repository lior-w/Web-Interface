import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ScrollContainer } from "react-nice-scroll";

export interface IProps {
  token: string;
  toMain: () => void;
}

export interface Questionaire {
  title: string;
  description: string;
}

const CreateGame = ({ token, toMain }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionnaire, setQuestionnaire] = useState<string>("");
  const [filterQuestionaire, setFilterQuestionaire] = useState<string>("");
  const [map, setMap] = useState<string>("");
  const [filterMap, setFilterMap] = useState<string>("");
  const [numGroups, setNumGroups] = useState<number>(2);
  const [startingPositions, setStartingPositions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStartingPositions(startingPositions.slice(0, numGroups));
    // Additional validation can be added for other fields

    // Here you can implement logic for submitting the game creation form
    // For simplicity, let's just display a success message
    //   const headers = {
    //     'Authorization': description,
    //   };
    //   try {
    //     const response = await axios.post("http://3.147.60.59:8080/game/add_game_instance", {
    //     }, { headers });
    //     // Handle the successful response
    //     alert('Response: ' +  response.data);
    //   } catch (error) {
    //     // Handle the error
    //     alert('Error: ' + error);
    //   }
    //   setSuccessMessage("Game created successfully!");
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

  const showQuestionaires = (list: string[]) => {
    return (
      <select
        className="rounded-md h-10"
        value={questionnaire}
        onChange={(e) => setQuestionnaire(e.target.value)}
      >
        <option value="">Select Questionaire</option>
        {list
          .filter(
            (q) =>
              filterQuestionaire === "" ||
              q.toLowerCase().includes(filterQuestionaire.toLowerCase())
          )
          .map((q) => (
            <option value={q}>{q}</option>
          ))}
      </select>
    );
  };

  const showMaps = (list: string[]) => {
    return (
      <select
        className="rounded-md h-10"
        value={map}
        onChange={(e) => setMap(e.target.value)}
      >
        <option value="">Select Map</option>
        {list
          .filter(
            (m) =>
              filterMap === "" ||
              m.toLowerCase().includes(filterMap.toLowerCase())
          )
          .map((m) => (
            <option value={m}>{m}</option>
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

  const questionaires = [
    "Adventure Questions",
    "Fantasy Lore",
    "Jungle Trivia",
    "Medieval History",
    "Western Trivia",
  ];
  const maps = [
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
    <Container w="80%" h="auto">
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
                  {showQuestionaires(questionaires)}
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
                  value={numGroups}
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
                {Array.from({ length: numGroups }).map((group, index) =>
                  startingPosition(SP, index)
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
