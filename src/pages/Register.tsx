import React, { useState } from "react";
import axios from "axios";
import Container from "../components/container";
import { FaRegUserCircle } from "react-icons/fa";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Pages, Token } from "../types";
import { server } from "../main";

export interface IProps {
  token: Token;
  onRegistrationSuccess: () => void;
  onSignIn: () => void;
  toMain: () => void;
  pages: Pages;
}

export const Register = ({
  token,
  onRegistrationSuccess,
  onSignIn,
  toMain,
  pages,
}: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      await axios
        .post(`${server}/user/register`, {
          name: username,
          password: password,
          //permissions: "topyy",
        })
        .then((response) => alert(response))
        .catch((err) => alert(err));
      // alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
      onRegistrationSuccess();
    }
  };

  const handleSignIn = () => {
    onSignIn();
  };

  const handleBack = () => {
    toMain();
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <Container page="Register" pages={pages} username={undefined}>
      <div className="flex flex-row justify-center">
        <div className="p-8 flex flex-col border-3 border-brown rounded-lg items-center justify-center">
          <div className="text-4xl text-brown font-bold">Register</div>
          <div className="m-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-[400px]">
              <input
                className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
                type="text"
                placeholder={`Username`}
                value={username}
                onChange={onUsernameChange}
                required
              />
              <div className="m-1"></div>
              <input
                className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
                type="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
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
              <div className="m-1"></div>
              <input
                className="p-2.5 w-[100%] border-2 border-gray-300 rounded-md"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
              />
              <div className="m-3"></div>
              <div className="w-[100%] flex flex-row">
                <button
                  className="p-2 w-[100%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                  type="submit"
                >
                  REGISTER
                </button>
              </div>
            </div>

            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </Container>
  );
};
