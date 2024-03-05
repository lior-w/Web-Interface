import React, { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
  w: string;
}

const Container = ({ children, w }: IProps) => {
  return (
    <div
      style={{ width: w }}
      className="bg-my_orange m-auto  border-solid border-4 border-brown rounded-2xl hover:cursor-default"
    >
      {children}
    </div>
  );
};

export default Container;
