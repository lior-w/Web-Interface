import React, { ReactNode, useState } from "react";
import { GiPlanetConquest } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Pages } from "../types";
import { Button } from "@mui/material";

export interface IProps {
  pages: Pages;
  current: string;
  username: string | undefined;
}

const Navigation = ({ pages, current, username }: IProps) => {
  const showButton = (page: string) => {
    const bg = current === page ? "#f0f9ff" : "inherit";
    const tc = current === page ? "#3b82f6" : "#ffffff";
    return (
      <button
        className="mb-1 mr-5 pl-3 pr-3 rounded-lg text-xl font-semibold"
        style={{ background: bg, color: tc }}
        onClick={pages[page]}
      >
        {`${page}`}
      </button>
    );
  };

  const showUser = () => {
    return (
      <div className="flex flex-col w-[350px] pr-4 text-white" id="1">
        <div className="flex items-end justify-end" id="2">
          <div className="text-[40px]" id="3">
            <FaRegUserCircle />
          </div>
          <div className="ml-4 text-[30px]" id="4">{`${username}`}</div>
        </div>
        <button
          className="text-white flex text-[18px] items-center justify-end pt-2"
          onClick={pages["Logout"]}
        >
          <div className="pr-1" id="5">
            <MdLogout />
          </div>
          <div id="logout">logout</div>
        </button>
      </div>
    );
  };

  return (
    <div id="10">
      <div
        id="20"
        className="bg-blue-600 w-[100%] h-[100px] m-auto border-solid border-3 border-blue-400 hover:cursor-default flex justify-between"
      >
        <div id="30" className="flex items-end">
          <button onClick={pages["Main"]}>
            <div
              id="40"
              className="flex items-end text-white h-[60px] mr-[120px] mb-[3px]"
            >
              <div id="50" className="text-[56px]">
                <GiPlanetConquest />
              </div>
              <div className="text-[24px] h-[50px] flex items-end italic">
                Conquer The World
              </div>
            </div>
          </button>

          {false && (
            <div id="60" className="text-[20px]">
              <div id="Conquer">Conquer</div> <div id="The">The</div>{" "}
              <div id="World">World</div>
            </div>
          )}
          <div id="70" className="flex items-end">
            {Object.keys(pages).map(
              (key) =>
                !["Logout", "Main", "Post Game", "Running Game"].includes(
                  key
                ) && showButton(key)
            )}
          </div>
        </div>
        <div
          id="80"
          className="text-[25px] w-[350px] flex items-end justify-end pr-2"
        >
          {username !== undefined && showUser()}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
