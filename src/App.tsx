import { Dashboard } from "./pages/dashboard";
/*
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CreateGame } from "./pages/CreateGame";
import { CreateQuestion } from "./pages/CreateQuestion";
import { CreateQuestionaire } from "./pages/CreateQuestionaire";
import { MainPage } from "./pages/mainPage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { RunningGame } from "./pages/RunningGame";
import { SavedGames } from "./pages/SavedGames";
import { WaitingRoom } from "./pages/WaitingRoom";
import { Page1 } from "./pages/page1";
import { Page2 } from "./pages/page2";
*/

export const App = () => {
  return <Dashboard></Dashboard>;
};
/*
export const App = () => {
  const [name, setName] = useState<string>();
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/page1/liorrrr">page1</Link>
          </li>
          <li>
            <Link to="/page2/lior">page2</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="/page1/:name" element={<Page1 />} />
          <Route path="/page2/:name" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
};
*/
