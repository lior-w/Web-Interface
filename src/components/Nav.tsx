import React, { ReactNode, useState } from "react";
import { GiPlanetConquest } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Pages } from "../types";
import { BrowserRouter, Link } from "react-router-dom";

export interface IProps {
  pages: Pages;
  current: string;
  username: string | undefined;
}

const Nav = () => {
  return (
    <div id="10">
      <div
        id="20"
        className="bg-brown w-[100%] h-[100px] m-auto border-solid border-4 border-brown hover:cursor-default flex justify-between"
      >
        <div id="30" className="flex">
          <div id="40" className="flex items-start text-my_orange mr-[80px]">
            <div id="50" className="text-[80px]">
              <GiPlanetConquest />
            </div>
            <div id="60" className="text-[20px]">
              <div id="Conquer">Conquer</div> <div id="The">The</div>{" "}
              <div id="World">World</div>
            </div>
          </div>
          <div id="70" className="flex items-end">
            <nav>
              <div className="flex">
                <Link to="/create question">New Question</Link>
              </div>
            </nav>
          </div>
        </div>
        <div
          id="80"
          className="text-[25px] w-[350px] flex items-end justify-end pr-2"
        ></div>
      </div>
    </div>
  );
};

export default Nav;
