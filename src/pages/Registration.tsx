import React, { useState } from "react";
import axios from "axios";
import Container from "../components/container";
import { FaRegUserCircle } from "react-icons/fa";
import { IoArrowForwardCircle } from "react-icons/io5";

export interface IProps {
  onRegistrationSuccess: () => void;
  onSignIn: () => void;
  toMain: () => void;
}

function Registration({ onRegistrationSuccess, onSignIn, toMain }: IProps) {
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
        .post("http://localhost:8080/user/register", {
          name: username,
          password: password,
          permissions: "topyy",
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
    <Container>
      <div className="flex flex-row">
        <div className="p-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">Register</div>
          <div className="m-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-[70%] max-w-[300px]">
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
              <div className="m-2.5"></div>
              <div className="w-[100%] flex flex-row">
                <button
                  className="p-2 w-[40%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                  type="submit"
                >
                  REGISTER
                </button>
              </div>
            </div>

            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>
        </div>
        <div className="w-[40%] bg-brown  rounded-r-md">
          <div className="p-1 flex justify-end">
            <button
              className="text-3xl text-orange-100 font-bold cursor-pointer"
              type="button"
              onClick={handleBack}
            >
              <IoArrowForwardCircle />
            </button>
          </div>
          <div className="pt-28 text-my_orange text-center min-w-[170px]">
            Already have an account?
          </div>
          <div className="flex justify-center ">
            <button
              className="text-2xl text-orange-100 font-bold cursor-pointer"
              type="button"
              onClick={handleSignIn}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Registration;
