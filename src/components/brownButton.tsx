import React, { ReactNode } from "react";

export interface IProps {
  label: string;
  width: number;
  onClick: () => void;
}

const BrwonButton = ({ label, width, onClick }: IProps) => {
  return (
    <button
      className={`p-2.5 bg-brown text-2xl text-my_orange hover:bg-amber-700 rounded-lg cursor-pointer`}
      style={{ width: width }}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BrwonButton;
