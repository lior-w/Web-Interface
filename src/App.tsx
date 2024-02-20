import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateGame from "./components/CreateGame";
import SavedGames from "./components/SavedGames";
import CreateQuestionnaire from "./components/CreateQuestionaire";
import { Router } from "react-router";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SavedGames />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
