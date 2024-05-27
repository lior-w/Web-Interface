import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface IProps {
  values: number[];
  defaultValue: number;
  func: (val: number) => void;
}

export default function BasicSelect({ values, defaultValue, func }: IProps) {
  const [rows, setRows] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setRows(Number(event.target.value));
    func(Number(event.target.value));
  };

  return (
    <Select
      sx={{ height: 30 }}
      defaultValue={`${defaultValue}`}
      value={`${rows}`}
      onChange={handleChange}
    >
      {values.map((v) => (
        <MenuItem value={v}>{`${v}`}</MenuItem>
      ))}
    </Select>
  );
}
