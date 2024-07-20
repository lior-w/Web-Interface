import { ReactNode } from "react";
import Navigation from "../components/navigation";
import { Pages } from "../types";

export interface IProps {
  children: ReactNode;
  page: string;
  pages: Pages;
  username: string | undefined;
}

const Container = ({ children, page, pages, username }: IProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-napoleon">
        <div className="absolute inset-0 bg-gray-200 opacity-75"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation
          pages={pages}
          current={page}
          username={username}
        ></Navigation>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Container;
