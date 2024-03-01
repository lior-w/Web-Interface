import * as React from "react";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: number]: {
    icon: React.ReactElement;
  };
} = {
  1: {
    icon: (
      <LooksOneOutlinedIcon
        style={{ width: "36px", height: "36px" }}
        className="text-green-600"
      />
    ),
  },
  2: {
    icon: (
      <LooksTwoOutlinedIcon
        style={{ width: "36px", height: "36px" }}
        className="text-lime-500"
      />
    ),
  },
  3: {
    icon: (
      <Looks3OutlinedIcon
        style={{ width: "36px", height: "36px" }}
        className="text-sky-400"
      />
    ),
  },
  4: {
    icon: (
      <Looks4OutlinedIcon
        style={{ width: "36px", height: "36px" }}
        className="text-orange-600"
      />
    ),
  },
  5: {
    icon: (
      <Looks5OutlinedIcon
        style={{ width: "36px", height: "36px" }}
        className="text-red-800"
      />
    ),
  },
};

const IconContainer = ({ value, ...other }: IconContainerProps) => {
  return <span {...other}>{customIcons[value].icon}</span>;
};

export interface IProps {
  onValueChange: (num: number | null) => void;
}

const NumbersRating = ({ onValueChange }: IProps) => {
  const [val, setVal] = React.useState<number | null>(0);

  const onChange = (value: number | null) => {
    setVal(value);
    onValueChange(value);
  };

  return (
    <StyledRating
      size="large"
      value={val}
      IconContainerComponent={IconContainer}
      onChange={(e, val) => onChange(val)}
      highlightSelectedOnly={true}
      sx={{ fontSize: "8rem" }}
    />
  );
};

export default NumbersRating;
