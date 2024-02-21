import React, { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
      onRegistrationSuccess();
    }
  };

  const handleSignIn = () => {
    onSignIn();
  };

  const handleBack = () => {
    toMain();
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
      <div className="text-center text-4xl">Register</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Username</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            className="p-2.5 mb-2.5 w-80 border-2 border-gray-300 rounded-md"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="mt-2 p-2.5 w-80 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="mt-3 flex flex-row text-lg justify-center">
          <label>Have an Account?</label>
          <div className="w-2"></div>
          <button className="font-bold" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
