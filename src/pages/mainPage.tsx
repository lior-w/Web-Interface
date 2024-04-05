import React, { useState } from "react";
import Container from "../components/container.tsx";
import BrwonButton from "../components/brownButton.tsx";
import { Token } from "../types";

export interface IProps {
  token: Token;
  logged: boolean;
  username: string;
  toLogin: () => void;
  toRegisrtation: () => void;
  toCreateGame: () => void;
  toSavedGames: () => void;
  toCreateQuestion: () => void;
  toCreateQuestionaire: () => void;
  toWaitingRoom: () => void;
}

const MainPage = ({
  token,
  logged,
  username,
  toLogin,
  toRegisrtation,
  toCreateGame,
  toSavedGames,
  toCreateQuestion,
  toCreateQuestionaire,
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

  const handleCreateQuestionaire = () => {
    toCreateQuestionaire();
  };

  const handleWaitingRoom = () => {
    toWaitingRoom();
  };
  return (
    <Container w="60%" h="auto">
      <div className="text-center text-4xl text-brown font-bold">Main</div>
      {logged && (
        <div className="text-center text-xl text-brown font-bold">
          Hello {username}!
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="m-3"></div>
        {!logged && (
          <>
            <BrwonButton label={"Login"} width={320} onClick={handleLogin} />
            <div className="m-3"></div>
            <BrwonButton
              label={"Register"}
              width={320}
              onClick={handleRegister}
            />
            <div className="m-3"></div>
          </>
        )}
        {logged && (
          <>
            <BrwonButton
              label={"Create Question"}
              width={320}
              onClick={handleCreateQuestion}
            />
            <div className="m-3"></div>
            <BrwonButton
              label={"Create Questionaire"}
              width={320}
              onClick={handleCreateQuestionaire}
            />
            <div className="m-3"></div>
            <BrwonButton
              label={"Saved Games"}
              width={320}
              onClick={handleSavedGames}
            />
            <div className="m-3"></div>
            <BrwonButton
              label={"Create Game"}
              width={320}
              onClick={handleCreateGame}
            />
            <div className="m-3"></div>
            <BrwonButton
              label={"Waiting Room"}
              width={320}
              onClick={handleWaitingRoom}
            />
            <div className="m-3"></div>
          </>
        )}
      </div>
    </Container>
  );
};

export default MainPage;
