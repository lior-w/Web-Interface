import React, { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
  width: string;
}

const Container = ({ children, width }: IProps) => {
  return (
    <div
      className={`bg-my_orange m-auto  border-solid border-4 border-brown rounded-2xl w-[${width}] min-w-[800px]  hover:cursor-default`}
    >
      {children}
    </div>
  );
};

export default Container;
