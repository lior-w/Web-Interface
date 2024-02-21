import React, { useState } from "react";

export interface IProps {
  toLogin: () => void;
  toRegisrtation: () => void;
  toCreateGame: () => void;
  toSavedGames: () => void;
}

const MainPage = ({
  toLogin,
  toRegisrtation,
  toCreateGame,
  toSavedGames,
}: IProps) => {
  const handleLogin = () => {
    toLogin();
  };

  const handleRegister = () => {
    toRegisrtation();
  };

  const handleCreateGame = () => {
    toCreateGame();
  };

  const handleSavedGames = () => {
    toSavedGames();
  };
  return (
    <div className="flex flex-col items-center p-4 bg-amber-200 m-auto mt-4 border-solid border-4 border-amber-400 space-y-8 rounded-2xl w-[50%] min-w-96">
      <div className="text-center text-4xl">Main</div>
      <button
        className="mt-6 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="mt-6 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleRegister}
      >
        Register
      </button>
      <button
        className="mt-6 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleCreateGame}
      >
        CreateGame
      </button>
      <button
        className="mt-6 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleSavedGames}
      >
        Saved Games
      </button>
    </div>
  );
};

export default MainPage;
