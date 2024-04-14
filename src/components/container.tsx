import React, { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
  w: string;
  h: string;
}

const Container = ({ children, w, h }: IProps) => {
  return (
    <div className="p-4">
      <div
        style={{ width: w, height: h }}
        className="bg-my_orange m-auto  border-solid border-4 border-brown rounded-2xl hover:cursor-default"
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
