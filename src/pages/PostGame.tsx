import { useState, useEffect } from "react";
import Container from "../components/container";
import axios from "axios";
import { Group, Pages, Token, PostGameGroup } from "../types";
import { server } from "../main";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";

export interface IProps {
  token: Token;
  username: string | undefined;
  runningGameId: string | undefined;
  groups: Group[];
  pages: Pages;
}

export const PostGame = ({
  token,
  username,
  runningGameId,
  groups,
  pages,
}: IProps) => {
  const [postGameGroups, setPostGameGroups] = useState<PostGameGroup[]>([]);

  const fetchStats = async () => {
    const url = `${server}/running_game/get_lean_running_game_instance/${runningGameId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        sortGroupsByPoints(response.data.value.groups);
      })
      .catch((error) => alert(error));
  };
  const gold = () => {
    return (
      <div className="text-[#FFA500] text-4xl flex">
        <EmojiEventsIcon fontSize="inherit" />
      </div>
    );
  };
  const silver = () => {
    return (
      <div className="text-slate-500 text-4xl flex">
        <WorkspacePremiumTwoToneIcon fontSize="inherit" />
      </div>
    );
  };
  const bronze = () => {
    return (
      <div className="text-orange-700 text-4xl flex">
        <WorkspacePremiumTwoToneIcon fontSize="inherit" />
      </div>
    );
  };

  const sortGroupsByPoints = (groups: Group[]) => {
    const groupsColors: { [key: number]: string } = {
      1: "#1D24CA",
      2: "#e63946",
      3: "#66FF00",
      4: "#FF00FF",
      5: "#481E14",
    };

    // Make a copy of the groups array to avoid mutating props directly
    const sortedGroups = [...groups]
      .sort((a, b) => b.score - a.score)
      .filter((g) => g.number > 0);

    console.log(`sortedGroups length: ${sortedGroups.length}`);

    const postGameGroups = sortedGroups.map((group, index) => ({
      group: group,
      place: index + 1,
      color: groupsColors[group.number] || "#000000",
    }));

    setPostGameGroups(postGameGroups);
  };

  useEffect(() => {
    console.log("use effect");
    fetchStats();
    // sortGroupsByPoints();
  }, []);

  return (
    <Container page="" pages={pages} username={username}>
      <div className="p-4">
        {
          <div className="mt-[20px] flex flex-col items-center">
            <div className="text-6xl mb-[50px] font-bold">Scoreboard</div>
            {postGameGroups.map((pgg) => (
              <div className="flex mt-[20px]">
                <div
                  className="p-2 mt-[7px] h-[50px] w-[600px] border-1 border-black rounded-lg items-center justify-center backdrop-blur-xl brightness-110"
                  style={{ color: pgg.color, fontFamily: "fantasy" }}
                >
                  <div className="flex text-2xl justify-between">
                    <div className="flex">
                      <div className="mr-2">{`${pgg.place}. Group ${pgg.group.number}`}</div>
                      <div className="">
                        {pgg.place === 1 ? (
                          gold()
                        ) : pgg.place === 2 ? (
                          silver()
                        ) : pgg.place === 3 ? (
                          bronze()
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    <div className="font-bold">{`${pgg.group.score}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </Container>
  );
};
