import React, { MouseEventHandler, useState } from "react";
import Container from "../components/container";
import axios from "axios";
import { Pages, Token } from "../types";
import { server } from "../main";
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface IProps {
  onLoginSuccess: (token: Token, username: string) => void;
  pages: Pages;
}

export const Login = ({ onLoginSuccess, pages }: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginJSON = () => {
    return { username: username, password: password };
  };

  const handleSubmit = async () => {
    console.log("try to login");
    const url = `${server}/user/login`;
    await axios
      .post(url, loginJSON())
      .then((response) => {
        const token: Token = { AUTHORIZATION: response.data.value.id };
        console.log(response.data.value.id);
        console.log(token.AUTHORIZATION);
        onLoginSuccess(token, username);
      })
      .catch((error) => alert(error));
    console.log("finish");
  };

  //const handleForgotPassword = () => {};

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
        <div className="p-8 flex flex-col border-1 border-blue-400 rounded-lg items-center justify-center">
          <div className="text-4xl text-black font-bold">Login</div>
          <div className="mb-3"></div>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div className="flex flex-col">
              <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-username">
                  Username
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-username"
                  type="text"
                  label="Username"
                  value={username}
                  onChange={onUsernameChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
          </Box>

          <div className="w-[100%] flex flex-col justify-center items-center">
            <button
              className="p-2 w-[300px] mt-[10px] bg-blue-500 text-xl text-white hover:bg-blue-700 rounded-lg cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              LOGIN
            </button>
          </div>

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
      </div>
    </Container>
  );
};

/*
              <button
                className="min-w-[135px] text-brown font-bold cursor-pointer hover:text-amber-700"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
*/
