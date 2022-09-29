import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";

const namesProjects = [
  "МИС>Ламинария",
  "НИОКР>Б-ПЧ",
  "НИОКР>Б-ПЧ1",
  "НИОКР>ВУМ-В",
  "НИОКР>ГЛАЗ",
  "НИОКР>КА-ППК",
  "ППМ>КА-ППК",
  "ПРОЧЕЕ",
];

interface IProps {
  value: string;
  onChange: (e: SyntheticEvent<Element, Event>) => void;
}

export default function DropDownList({ onChange, value }: IProps) {
  return (
    <div>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={value}
          onChange={onChange}
          options={namesProjects}
          renderInput={(params) => {
            return <TextField {...params} label="Выберите проект" />;
          }}
        />
      </FormControl>
    </div>
  );
}
