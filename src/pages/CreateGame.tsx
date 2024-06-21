import React, { useState } from "react";
import Container from "../components/container_";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Questionnaire, Token, Map, Pages } from "../types";
import axios from "axios";
import { server } from "../main";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SelectQuestionnaire } from "../components/questionnairesTable";
import { SelectMap } from "../components/mapsTable";
import { SelectStartingPositions } from "../components/startingPositions";

const steps = [
  "Enter Title and Description",
  "Select Questionnaire and Question Time Limit",
  "Select Map and Number of Groups",
  "Select Starting Points",
];

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  pages: Pages;
}

export const CreateGame = ({ token, toMain, username, pages }: IProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionnaireId, setQuestionnaireId] = useState<string>("");
  const [mapId, setMapId] = useState<string>("");
  const [mapObject, setMapObject] = useState<Map>();
  const [numberOfGroups, setNumberOfGroups] = useState<number>(2);
  const [gameTime, setGameTime] = useState<number>(60);
  const [isShared, setIsShared] = useState<boolean>(false);
  const [questionTimeLimit, setQuestionTimeLimit] = useState<number>(0);
  const [startingPositions, setStartingPositions] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const params = {
      title: title,
      description: description,
      questionnaireID: questionnaireId,
      mapId: mapId,
      creatorId: token.AUTHORIZATION,
      groups: numberOfGroups,
      gameTime: gameTime,
      isShared: isShared,
      questionTimeLimit: questionTimeLimit,
      startingPositions: startingPositions,
    };

    const headers = {
      Authorization: token.AUTHORIZATION,
    };

    const url = `${server}/game/add_game_instance`;
    await axios
      .post(url, params, { headers })
      .then(() => alert("New game has been created successfuly"))
      .catch((error) => alert(error));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsShared(checked);
  };

  const onQuestionTimeLimnitChange = (e: SelectChangeEvent) => {
    setQuestionTimeLimit(Number(e.target.value));
  };

  const onGameTimeChange = (e: SelectChangeEvent) => {
    setGameTime(Number(e.target.value));
  };
  const handleChangeSelectedQuestionnaires = (
    compSelectedQuestionnaire: string
  ) => {
    setQuestionnaireId(compSelectedQuestionnaire);
  };

  const handleChangeSelectedMap = (compSelectedMap: Map) => {
    setMapObject(compSelectedMap);
    setMapId(compSelectedMap.id);
  };

  const handleChangeNumberOfGroups = (e: SelectChangeEvent) => {
    let num = 0;
    try {
      num = Number(e.target.value);
      num >= 2 && num <= 6 && setNumberOfGroups(num);
    } catch (exp) {}
  };

  const handleChangeStartingPositions = (selected: string[]) => {
    setStartingPositions(selected);
  };

  const step3 = () => {
    return (
      <SelectStartingPositions
        handleChangeInPage={handleChangeStartingPositions}
        selectedMap={mapObject}
        selectedTiles_={startingPositions}
        numberOfGroups={numberOfGroups}
        token={token}
      ></SelectStartingPositions>
    );
  };
  const step2 = () => {
    return (
      <div>
        <div>
          <FormControl
            variant="standard"
            sx={{ width: 160, marginRight: 1, marginBottom: 4 }}
          >
            <InputLabel id="label2" sx={{ fontSize: 20, fontWeight: 700 }}>
              Number of Groups
            </InputLabel>
            <Select
              labelId="label2"
              label="Number of Groups"
              value={numberOfGroups.toString()}
              onChange={handleChangeNumberOfGroups}
              variant="standard"
            >
              {["2", "3", "4", "5"].map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <SelectMap
          handleChangeInPage={handleChangeSelectedMap}
          selectedId={mapId}
          token={token}
        ></SelectMap>
      </div>
    );
  };

  const step1 = () => {
    return (
      <div>
        <div>
          <FormControl
            variant="standard"
            sx={{ width: 160, marginRight: 1, marginBottom: 4 }}
          >
            <InputLabel id="label1" sx={{ fontSize: 20, fontWeight: 700 }}>
              Question Time Limit
            </InputLabel>
            <Select
              labelId="label1"
              label="Question Time Limit"
              value={questionTimeLimit.toString()}
              onChange={onQuestionTimeLimnitChange}
              variant="standard"
            >
              {["1", "2", "3", "4", "5"].map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option} min`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <SelectQuestionnaire
          handleChangeInPage={handleChangeSelectedQuestionnaires}
          selectedId={questionnaireId}
          token={token}
        ></SelectQuestionnaire>
      </div>
    );
  };

  const step0 = () => {
    return (
      <div className="flex flex-col w-[600px] mt-[50px] rounded-lg border-brown">
        <TextField
          id="Title"
          sx={{
            background: "#FFFFFF",
            width: 600,
            marginTop: 6,
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
            marginTop: 4,
            marginBottom: 6,
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
        <div className="flex justify-between items-end">
          <div className="">
            <FormControlLabel
              control={
                <Switch value={isShared} onChange={handleSwitchChange} />
              }
              label={
                <div className="text-xl text-brown font-bold ml-[30px]">
                  Shared
                </div>
              }
            />
          </div>
          <FormControl variant="standard" sx={{ width: 160 }}>
            <InputLabel id="label1" sx={{ fontSize: 20, fontWeight: 700 }}>
              Game time
            </InputLabel>
            <Select
              labelId="label1"
              label="Question Time Limit"
              value={gameTime.toString()}
              onChange={onGameTimeChange}
              variant="standard"
            >
              {["15", "30", "45", "60"].map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option} min`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  };
  return (
    <Container page="New Game" pages={pages} username={username}>
      <div className="text-4xl text-brown font-bold ml-[40px]">New Game</div>
      <Box sx={{ width: "100%", padding: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && (
          <React.Fragment>
            <Typography
              sx={{ mt: 2, mb: 1, display: "flex", justifyContent: "center" }}
            >
              {step0()}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </React.Fragment>
        )}
        {activeStep === 1 && (
          <React.Fragment>
            <Typography sx={{ mt: 4 }}>{step1()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={questionnaireId === "" || questionTimeLimit === 0}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
        {activeStep === 2 && (
          <React.Fragment>
            <Typography sx={{ mt: 4 }}>{step2()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} disabled={mapId === ""}>
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
        {activeStep === 3 && (
          <React.Fragment>
            <Typography sx={{ mt: 4 }}>{step3()}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleSubmit} disabled={false}>
                Finish
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
};
