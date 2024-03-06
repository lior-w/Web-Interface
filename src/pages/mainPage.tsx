import React, { useState } from "react";
import Container from "../components/container.tsx";
import BrwonButton from "../components/brownButton.tsx";

export interface IProps {
  toLogin: () => void;
  toRegisrtation: () => void;
  toCreateGame: () => void;
  toSavedGames: () => void;
  toCreateQuestion: () => void;
  toWaitingRoom: () => void;
}

const MainPage = ({
  toLogin,
  toRegisrtation,
  toCreateGame,
  toSavedGames,
  toCreateQuestion,
  toWaitingRoom,
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

  const handleWaitingRoom = () => {
    toWaitingRoom();
  };

  return (
    <Container w={"60%"}>
      <div className="text-center text-4xl text-brown font-bold">Main</div>
      <div className="flex flex-col items-center">
        <div className="m-3"></div>
        <BrwonButton
          label={"Login"}
          width={320}
          onClick={handleLogin}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Register"}
          width={320}
          onClick={handleRegister}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Create Question"}
          width={320}
          onClick={handleCreateQuestion}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Saved Games"}
          width={320}
          onClick={handleSavedGames}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Create Game"}
          width={320}
          onClick={handleCreateGame}
        ></BrwonButton>
        <div className="m-3"></div>
        <BrwonButton
          label={"Waiting Room"}
          width={320}
          onClick={handleWaitingRoom}
        ></BrwonButton>
        <div className="m-3"></div>
      </div>
    </Container>
  );
};

export default MainPage;
