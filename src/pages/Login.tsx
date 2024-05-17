import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import axios from "axios";
import { Pages, Token } from "../types";
import { server } from "../main";

export interface IProps {
  onLoginSuccess: (token: Token, username: string) => void;
  onSignUp: () => void;
  toMain: () => void;
  pages: Pages;
}

const Login = ({ onLoginSuccess, onSignUp, toMain, pages }: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginJSON = () => {
    return { username: username, password: password };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("try to login");
    const url = `${server}/user/login`;
    e.preventDefault();
    await axios
      .post(url, loginJSON())
      .then((response) => {
        alert(`Welcome ${username}!`);
        const token: Token = { AUTHORIZATION: response.data.value.id };
        console.log(response.data.value.id);
        console.log(token.AUTHORIZATION);
        onLoginSuccess(token, username);
      })
      .catch((error) => alert(error));
    console.log("finish");
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
    <Container page="Login" pages={pages} username={undefined}>
      <div className="flex flex-row justify-center">
        <div className="p-8 flex flex-col border-3 border-brown rounded-lg items-center justify-center">
          <div className="text-4xl text-brown font-bold">Login</div>
          <div className="mb-3"></div>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-[400px]">
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
              <button
                className="min-w-[135px] text-brown font-bold cursor-pointer hover:text-amber-700"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
              <div className="m-1.5"></div>
              <div className="w-[100%] flex flex-col justify-center items-center">
                <button
                  className="p-2 w-[100%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                  type="submit"
                >
                  LOGIN
                </button>
                <div className=""></div>
              </div>
            </div>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;

/*
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
        */
