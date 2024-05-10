import Container from "../components/container.tsx";
import { Pages, Token } from "../types";
import { server } from "../main";

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
  pages: Pages;
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
  pages,
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
    <Container page="a" pages={pages}>
      <div className="m-3 text-center text-4xl text-brown font-bold">Main</div>
      {logged && (
        <div className="text-center text-xl text-brown font-bold">
          Hello {username}!
        </div>
      )}
      <div className="m-3 flex flex-col items-center">
        {!logged && (
          <>
            <button
              className="m-3 btn border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>

            <button
              className="m-3 btn border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleRegister}
            >
              Register
            </button>
          </>
        )}
        {logged && (
          <>
            <button
              className="btn m-3 border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleCreateQuestion}
            >
              Create Question
            </button>
            <button
              className="btn m-3 border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleCreateQuestionaire}
            >
              Create Questionnaire
            </button>
            <button
              className="btn m-3 border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleSavedGames}
            >
              Saved Games
            </button>
            <button
              className="btn m-3 border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleCreateGame}
            >
              Create Game
            </button>
            <button
              className="btn m-3 border-brown w-[320px] bg-brown text-2xl text-orange-100 hover:bg-amber-700 hover:border-brown rounded-lg cursor-pointer"
              onClick={handleWaitingRoom}
            >
              Waiting Room
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default MainPage;
