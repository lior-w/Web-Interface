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
          <div>Title</div>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Description</div>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Questionnaire</div>
          <select
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
        <div>
          <div>Map</div>
          <select
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
        <div>
          <div>Number of Groups</div>
          <input
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
            <div key={index}>
              <div>{`Starting Position for Group ${index + 1}:`}</div>
              <select
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

        <button type="submit">Create Game</button>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
}

export default CreateGame;
