import React, { useState } from "react";
import axios from "axios";
import Container from "../components/container";
import { Pages, Token } from "../types";
import { server } from "../main";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export interface IProps {
  token: Token;
  pages: Pages;
}

export const Register = ({ token, pages }: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
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
      pages["Login"]();
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

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <Container page="Register" pages={pages} username={undefined}>
      <div className="flex flex-row justify-center">
        <div className="p-8 flex flex-col border-1 border-blue-400 rounded-lg items-center justify-center">
          <div className="text-4xl text-black font-bold">Register</div>
          <div className="flex flex-col mt-[20px] justify-center items-center">
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
                <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
            </Box>

            <button
              className="p-2 w-[300px] mt-[10px] bg-blue-600 text-xl text-white hover:bg-blue-800 rounded-lg cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              REGISTER
            </button>
          </div>

          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        </div>
      </div>
    </Container>
  );
};
