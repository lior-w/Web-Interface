import React, { ReactNode, useState } from "react";
import { GiPlanetConquest } from "react-icons/gi";
import { Pages } from "../types";

export interface IProps {
  pages: Pages;
  current: string;
}

const Navigation = ({ pages, current }: IProps) => {
  const [currentPage, setCurrentPage] = useState<string>(current);

  const showButton = (page: string) => {
    const bg = currentPage === page ? "#ffedd5" : "inherit";
    const tc = currentPage === page ? "#8b4513" : "#ffedd5";
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

  return (
    <div className="">
      <div className="bg-brown bg-brown w-[100%] h-[100px] m-auto border-solid border-4 border-brown   hover:cursor-default flex items-end">
        <div className="flex items-start text-my_orange mr-[80px]">
          <div className="text-[80px]">
            <GiPlanetConquest />
          </div>
          <div className=" text-[20px]">
            <div>Conquer</div> <div>The</div> <div>World</div>
          </div>
        </div>
        {Object.keys(pages).map((key) => showButton(key))}
      </div>
    </div>
  );
};

export default Navigation;
