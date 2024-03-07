import React, { useState } from "react";
import Container from "../components/container";
import BrwonButton from "../components/brownButton";
import { TiArrowForward } from "react-icons/ti";
import { BsArrowClockwise } from "react-icons/bs";
import { IoArrowForwardCircle } from "react-icons/io5";

export interface IProps {
  onLoginSuccess: () => void;
  onSignUp: () => void;
  toMain: () => void;
}

const Login = ({ onLoginSuccess, onSignUp, toMain }: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      // Redirect to SavedGames.tsx on successful login
      onLoginSuccess();
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const handleSignUp = () => {
    onSignUp();
  };

  const handleForgotPassword = () => {};

  const handleBack = () => {
    toMain();
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <Container w="60%" h="auto">
      <div className="flex flex-row">
        <div className="p-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">Login</div>
          <div className="m-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-[70%] max-w-[300px]">
              <input
                className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Username"
                value={username}
                onChange={onUsernameChange}
                required
              />
              <div className="m-1"></div>
              <input
                className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
                required
              />
              <div className="m-2.5"></div>
              <div className="w-[100%] flex flex-row">
                <button
                  className="p-2 w-[40%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                  type="submit"
                >
                  LOGIN
                </button>
                <div className="w-[30%]"></div>
                <button
                  className="text-right min-w-[135px] w-[30%] text-brown font-bold cursor-pointer hover:text-amber-700"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </form>
        </div>
        <div className="w-[40%] bg-brown  rounded-r-md">
          <div className="p-1 flex justify-end">
            <button
              className="text-3xl text-orange-100 font-bold cursor-pointer hover:text-orange-200"
              type="button"
              onClick={handleBack}
            >
              <IoArrowForwardCircle />
            </button>
          </div>
          <div className="pt-20 text-my_orange text-center min-w-[170px]">
            Don't have account yet?
          </div>
          <div className="flex justify-center ">
            <button
              className="text-2xl text-orange-100 font-bold cursor-pointer hover:text-orange-200"
              type="button"
              onClick={handleSignUp}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
