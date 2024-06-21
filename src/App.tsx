import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { CreateGame } from "./pages/CreateGame";
import CreateQuestion from "./pages/CreateQuestion";
import { CreateQuestionaire } from "./pages/CreateQuestionaire";
import Main from "./pages/Main";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { RunningGame } from "./pages/RunningGame";
import { SavedGames } from "./pages/SavedGames";
import { WaitingRoom } from "./pages/WaitingRoom";
import { Page1 } from "./pages/page1";
import { Page2 } from "./pages/page2";

/*
export const App = () => {
  return <Dashboard></Dashboard>;
};
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/create_question",
    element: <CreateQuestion />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
