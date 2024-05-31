import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Questionnaire, Token, Map, Pages } from "../types";
import axios from "axios";
import { server } from "../main";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  pages: Pages;
}

const CreateGame = ({ token, toMain, username, pages }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
    id: "",
    name: "",
    questions: [],
  });
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [filterQuestionaire, setFilterQuestionaire] = useState<string>("");
  const [map, setMap] = useState<Map>({
    id: "",
    name: "",
    statringPositions: [],
  });
  const [maps, setMaps] = useState<Map[]>([]);
  const [filterMap, setFilterMap] = useState<string>("");
  const [numberOfGroups, setNumGroups] = useState<number>(2);
  const [startingPositions, setStartingPositions] = useState<string[]>([]);

  /*
  const loadAllQuestionnaires = async () => {
    const url = `${server}/game/get_all_questionnaires`;
    await axios
      .get(url)
      .then((response) => setQuestionnaires(response.data))
      .catch((error) => alert(error));
  };

  const loadAllMaps = async () => {
    const url = `${server}/game/get_all_maps`;
    await axios
      .get(url)
      .then((response) => setMaps(response.data))
      .catch((error) => alert(error));
  };

  loadAllQuestionnaires();
  loadAllMaps();
*/
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStartingPositions(startingPositions.slice(0, numberOfGroups));
    // Additional validation can be added for other fields

    // Here you can implement logic for submitting the game creation form
    // For simplicity, let's just display a success message
    const headers = {
      Authorization: token.AUTHORIZATION,
    };
    try {
      const response = await axios.post(
        `${server}/game/add_game_instance`,
        {
          host: token.AUTHORIZATION,
          questionnaire: questionnaire,
          map: map,
          status: "ACTIVE",
          numberOfGroups: 3,
          name: "Sample Game",
          description: "This is a sample game instance.",
          groupAssignmentProtocol: "RANDOM",
          gameTime: 60,
          shared: true,
          questionTimeLimit: 30,
        },
        { headers }
      );
      // Handle the successful response
      alert("Response: " + response.data);
    } catch (error) {
      // Handle the error
      alert("Error: " + error);
    }
  };

  const handleBack = () => {
    toMain();
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onQuestionnaireChange = (e: SelectChangeEvent) => {
    const q = questionnaires.find((q1) => q1.id === e.target.value);
    if (q !== undefined) {
      setQuestionnaire(q);
    }
  };

  const onStartingPositionsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setStartingPositions(
      startingPositions
        .slice(0, index)
        .concat(e.target.value)
        .concat(startingPositions.slice(index + 1))
    );
  };

  const step1 = () => {
    return (
      <div className="flex flex-col">
        <TextField
          id="Title"
          sx={{
            background: "#FFFFFF",
            width: 600,
            marginTop: 2,
          }}
          label="Title"
          variant="filled"
          onChange={onTitleChange}
          value={title}
          required
        />
        {title.length >= 100 && (
          <div className="text-red-600">
            Title length limit is 100 characters
          </div>
        )}
        <TextField
          id="Description"
          sx={{
            background: "#FFFFFF",
            width: 600,
            marginTop: 2,
          }}
          label="Description"
          variant="filled"
          onChange={onDescriptionChange}
          value={description}
          multiline
          required
        />

        {description.length >= 250 && (
          <div className="text-red-600">
            Description length limit is 250 characters
          </div>
        )}
      </div>
    );
  };
  return (
    <Container page="New Game" pages={pages} username={username}>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">New Game</div>
          <div className="mb-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {step1()}
            <FormControl
              variant="standard"
              sx={{ background: "#FFFFFF", width: 200, marginTop: 2 }}
            >
              <InputLabel id="label-Type">Questionnaire</InputLabel>
              <Select
                labelId="label-Type"
                label="Type"
                value={questionnaire.id}
                onChange={onQuestionnaireChange}
                variant="filled"
              >
                {questionnaires.map((q) => (
                  <MenuItem key={q.name} value={q.id}>
                    {q.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button
              className="p-2.5 mt-[20px] w-[300px] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              Create Game
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateGame;
