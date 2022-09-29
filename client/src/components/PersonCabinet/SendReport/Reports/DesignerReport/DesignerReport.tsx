import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DropDownList from "../UserReport/ProjectList/DropDownList/DropDownList";
import { SyntheticEvent, useState } from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { red } from "@mui/material/colors";

function createData(
  project: string, //проект
  hours: number, //часы
  archive: number, //архив
  comments: string //комментарии
) {
  return { project, hours, archive, comments };
}

const ButtonSuccess = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[300]),
    backgroundColor: green[300],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
}))(Button);

const ButtonSuccess2 = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red[300]),
    backgroundColor: red[300],
    "&:hover": {
      backgroundColor: red[300],
    },
  },
}))(Button);

const rows = [
  createData("Проект1", 237, 9, "37"),
  createData("Проект2", 262, 16.0, "24"),
  createData("Проект3", 305, 3.7, "67"),
  createData("Проект4", 356, 16.0, "49"),
];

interface SendReportFormType {
  project: string;
  hours: string;
  info: string;
}

export default function DesignerReport() {
  const [sendReportForm, setSendReportForm] = useState<SendReportFormType>({
    project: "",
    hours: "",
    info: "",
  });

  const handleSelectChange = (e: SyntheticEvent<Element, Event>) => {
    setSendReportForm(sendReportForm);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minHeight: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Проект</TableCell>
            <TableCell align="right">Часы</TableCell>
            <TableCell align="right">Архив</TableCell>
            <TableCell align="right">Проблемы и комментарии</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.project}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <DropDownList
                  onChange={handleSelectChange}
                  value={sendReportForm.project}
                />
              </TableCell>
              <TableCell align="right">{row.hours}</TableCell>
              <TableCell align="right">{row.archive}</TableCell>
              <TableCell align="right">{row.archive}</TableCell>
              <TableCell align="right">
                <ButtonSuccess variant="contained" color="primary">
                  +
                </ButtonSuccess>
                <br />
                <ButtonSuccess2
                  style={{ marginTop: 10 }}
                  variant="contained"
                  color="primary"
                >
                  -
                </ButtonSuccess2>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
