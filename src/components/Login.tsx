import React, { useState } from "react";
import "./Login.css";

export interface IProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: IProps) => {
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

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={onUsernameChange}
            required
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
