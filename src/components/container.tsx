import React, { ReactNode } from "react";
import Navigation from "./navigation";
import { Pages } from "../types";
import Nav from "./Nav";

export interface IProps {
  children: ReactNode;
  page: string;
  pages: Pages;
  username: string | undefined;
}
//style={{ width: w, height: h }}
const Container = ({ children, page, pages, username }: IProps) => {
  return (
    <div>
      <div className="bg-my_orange m-auto w-[100%] min-h-[100vh] border-solid border-4 border-brown  hover:cursor-default">
        {page !== "" && <Nav />}

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Container;
