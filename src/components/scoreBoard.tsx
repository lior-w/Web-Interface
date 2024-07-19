import { useState } from "react";
import { Group } from "../types";

export interface IProps {
  init_groups: Group[];
}

export const ScoreBoard = ({ init_groups }: IProps) => {
  const [groups, setGroups] = useState<Group[]>(init_groups);
};
