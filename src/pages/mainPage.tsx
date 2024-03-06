import React, { useState } from "react";
import Container from "../components/container.tsx";
import BrwonButton from "../components/brownButton.tsx";

export interface IProps {
  toLogin: () => void;
  toRegisrtation: () => void;
  toCreateGame: () => void;
  toSavedGames: () => void;
  toCreateQuestion: () => void;
}

const MainPage = ({
  toLogin,
  toRegisrtation,
  toCreateGame,
  toSavedGames,
  toCreateQuestion,
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

  const handleCreateQuestion = () => {
    toCreateQuestion();
  };

  return (
    <Container w={"60%"}>
      <div className="text-center text-4xl text-brown font-bold">Main</div>
      <div className="flex flex-col items-center">
        <div className="m-3"></div>
        <BrwonButton
          label={"Login (done)"}
          width={320}
          onClick={handleLogin}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Register (done)"}
          width={320}
          onClick={handleRegister}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Create Question (done)"}
          width={320}
          onClick={handleCreateQuestion}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Saved Games (done)"}
          width={320}
          onClick={handleSavedGames}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Create Game (done)"}
          width={320}
          onClick={handleCreateGame}
        ></BrwonButton>
        <div className="m-3"></div>
      </div>
    </Container>
  );
};

export default MainPage;
