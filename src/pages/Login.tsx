import React, { useState } from "react";

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
    <div className="flex flex-col items-center p-4 bg-amber-200 m-auto mt-4 border-solid border-4 border-amber-400 space-y-8 rounded-2xl w-[50%] min-w-96">
      <button
        className="mt-6 p-2.5 w-40 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="text-center text-4xl">Login</div>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Username</label>
          <input
            className="p-2.5 w-80 mb-2.5 border-2 border-gray-300 rounded-md"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={onUsernameChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="p-2.5 w-80 mb-2.5 border-2 border-gray-300 rounded-md"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>

        <button
          className="mt-2 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
          type="submit"
        >
          Sign In
        </button>
        <div className="mt-4 flex flex-row">
          <button
            className="p-1.5 w-36 border border-black hover:bg-amber-500 rounded-lg cursor-pointer"
            type="button"
          >
            Forgot Password?
          </button>
          <div className="w-8"></div>
          <button
            className="p-1.5 w-36 border border-black hover:bg-amber-500 rounded-lg cursor-pointer"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
