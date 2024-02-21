import React, { useState } from "react";

export interface IProps {
  toMain: () => void;
}

function CreateGame({ toMain }: IProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numGroups, setNumGroups] = useState<number>(2);
  const [map, setMap] = useState<string>("");
  const [startingPositions, setStartingPositions] = useState<string[]>([]);
  const [questionnaire, setQuestionnaire] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (numGroups < 2) {
      setErrorMessage("Number of groups must be at least 2");
      return;
    }
    // Additional validation can be added for other fields

    // Here you can implement logic for submitting the game creation form
    // For simplicity, let's just display a success message
    setSuccessMessage("Game created successfully!");
  };

  const handleBack = () => {
    toMain();
  };

  return (
    <div className="flex flex-col items-center p-4 bg-amber-200 m-auto mt-4 border-solid border-4 border-amber-400 space-y-8 rounded-2xl w-[50%] min-w-96">
      <button
        className="mt-6 p-2.5 w-40 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="text-center text-4xl">Create Game</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            id="title"
            type="text"
            placeholder="Enter The Game's Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            className="p-2.5 mb-2.5 w-80 min-h-24 max-h-24 border-2 border-gray-300 rounded-md"
            id="description"
            placeholder="Enter The Game's Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Questionnaire</label>
          <select
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            id="questionnaire"
            value={questionnaire}
            onChange={(e) => setQuestionnaire(e.target.value)}
            required
          >
            <option value="questionnaire1">Questionnaire 1</option>
            <option value="questionnaire2">Questionnaire 2</option>
            <option value="questionnaire3">Questionnaire 3</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Map</label>
          <select
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            id="map"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
          >
            <option value="map1">Map 1</option>
            <option value="map2">Map 2</option>
            <option value="map3">Map 3</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Number Of Groups</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            id="numGroups"
            type="number"
            min={2}
            value={numGroups}
            onChange={(e) => setNumGroups(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          {Array.from({ length: numGroups }).map((_, index) => (
            <div key={index} className="flex flex-col">
              <label>{`Starting Position for Group ${index + 1}:`}</label>
              <select
                className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
                id="startingPosition"
                value={startingPositions}
                onChange={(e) => setStartingPositions(Array(e.target.value))}
              >
                <option value="startingPosition1">Position 1</option>
                <option value="startingPosition2">Position 2</option>
                <option value="startingPosition3">Position 3</option>
              </select>
            </div>
          ))}
        </div>

        <button
          className="mt-2 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
          type="submit"
        >
          Create Game
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default CreateGame;
