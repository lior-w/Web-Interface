import { useState, useEffect } from "react";
import Container from "../components/container";
import axios from "axios";
import { Group, Pages, Token, PostGameGroup, RunningGameLean } from "../types";
import { server } from "../main";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";

export interface IProps {
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const Stats = ({ token, username, pages }: IProps) => {
  const [runningIds, setRunningIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [gameStats, setGameStats] = useState<any[]>([]);

  const fetch = async (pageNum: number) => {
    const url = `${server}/game/get_all_running_games_lean?page=${pageNum}&size=300`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        const ids = getIds(response.data.value);
        setRunningIds(ids);
        ids.forEach((id) => fetchStats(id));
      })
      .catch((error) => alert(error));
  };

  const getIds = (runningGames: RunningGameLean[]): string[] => {
    return runningGames.reduce<string[]>((ids, rg) => {
      ids.push(rg.id);
      return ids;
    }, []);
  };

  const fetchStats = async (runningId: string) => {
    const url = `${server}/running_game/get_game_statistic/${runningId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        addGameStats(response.data.value);
      })
      .catch((error) => alert(error));
  };

  const addGameStats = (gameStat: any) => {
    setGameStats(gameStats.concat(gameStat));
  };

  useEffect(() => {
    fetch(page);
  }, []);

  return (
    <Container page="" pages={pages} username={username}>
      <div>stats</div>
    </Container>
  );
};
