import React, { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return (
    <div className="bg-my_orange m-auto mt-4 border-solid border-4 border-brown rounded-2xl w-[60%] min-w-[800px]">
      {children}
    </div>
  );
};

export default Container;
