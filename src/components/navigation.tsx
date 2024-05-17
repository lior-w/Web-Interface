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

export interface IProps {
  pages: Pages;
  current: string;
  username: string | undefined;
}

const Navigation = ({ pages, current, username }: IProps) => {
  const showButton = (page: string) => {
    const bg = current === page ? "#ffedd5" : "inherit";
    const tc = current === page ? "#8b4513" : "#ffedd5";
    return (
      <button
        className="mb-1 mr-5 pl-3 pr-3 rounded-lg text-orange-100 text-xl font-semibold"
        style={{ background: bg, color: tc }}
        onClick={pages[page]}
      >
        {`${page}`}
      </button>
    );
  };

  const showUser = () => {
    return (
      <div className="flex flex-col w-[350px] pr-4 text-my_orange">
        <div className="flex items-end justify-end">
          <div className="text-[40px]">
            <FaRegUserCircle />
          </div>
          <div className="ml-4 text-[30px]">{`${username}`}</div>
        </div>
        <button
          className="text-orange-100 flex text-[18px] items-center justify-end pt-2"
          onClick={pages["Logout"]}
        >
          <div className="pr-1">
            <MdLogout />
          </div>
          <div>logout</div>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-brown w-[100%] h-[100px] m-auto border-solid border-4 border-brown hover:cursor-default flex justify-between">
        <div className="flex">
          <div className="flex items-start text-my_orange mr-[80px]">
            <div className="text-[80px]">
              <GiPlanetConquest />
            </div>
            <div className="text-[20px]">
              <div>Conquer</div> <div>The</div> <div>World</div>
            </div>
          </div>
          <div className="flex items-end">
            {Object.keys(pages).map(
              (key) => key !== "Logout" && showButton(key)
            )}
          </div>
        </div>
        <div className="text-[25px] w-[350px] flex items-end justify-end pr-2">
          {username !== undefined && showUser()}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
