import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TimeCard = () => {
  const row = [
    {
      dayOfWeek: "Пт",
      workTime: "06:56",
      late: "05:30",
      goOut: "00:00",
      wolk: "06:36",
    },
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>День</TableCell>
            <TableCell>Рабочее время</TableCell>
            <TableCell>Опоздал</TableCell>
            <TableCell>Ранний уход</TableCell>
            <TableCell>Прогулял</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((day) => (
            <TableRow key={row.dayOfWeek}>
              <TableCell>{row.dayOfWeek}</TableCell>
              <TableCell>{row.workTime}</TableCell>
              <TableCell>{row.late}</TableCell>
              <TableCell>{row.goOut}</TableCell>
              <TableCell>{row.wolk}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>Итого</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Норма часов</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeCard;
