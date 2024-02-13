import React, { useState } from "react";
import "./CreateGame.css";

function CreateGame() {
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

  return (
    <div className="create-game-container">
      <h2>Create Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numGroups">Number of Groups:</label>
          <input
            type="number"
            id="numGroups"
            value={numGroups}
            onChange={(e) => setNumGroups(parseInt(e.target.value))}
            min={2}
            required
          />
        </div>
        <div>
          <label htmlFor="map">Map:</label>
          {/* Dropdown for selecting map */}
          <select
            id="map"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
          >
            {/* Option list of maps */}
            <option value="">Select Map</option>
            <option value="map1">Map 1</option>
            <option value="map2">Map 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          {/* Input fields for starting positions of each group */}
          {Array.from({ length: numGroups }).map((_, index) => (
            <div key={index}>
              <label
                htmlFor={`startingPosition${index}`}
              >{`Starting Position for Group ${index + 1}:`}</label>
              <input
                type="text"
                id={`startingPosition${index}`}
                value={startingPositions[index] || ""}
                onChange={(e) => {
                  const updatedPositions = [...startingPositions];
                  updatedPositions[index] = e.target.value;
                  setStartingPositions(updatedPositions);
                }}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="questionnaire">Questionnaire:</label>
          {/* Dropdown for selecting questionnaire */}
          <select
            id="questionnaire"
            value={questionnaire}
            onChange={(e) => setQuestionnaire(e.target.value)}
            required
          >
            {/* Option list of questionnaires */}
            <option value="">Select Questionnaire</option>
            <option value="questionnaire1">Questionnaire 1</option>
            <option value="questionnaire2">Questionnaire 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button type="submit">Create Game</button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default CreateGame;
