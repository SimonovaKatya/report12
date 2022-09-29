import React, { SyntheticEvent, useState } from "react";
import "./Reports.css";
import { ReportsApi } from "../../../../../api";
import ProjectList from "./ProjectList/ProjectList";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DropDownList from "./ProjectList/DropDownList/DropDownList";
import FormTextArea from "./ProjectList/FormTextArea/FormTextArea";

const ButtonSuccess = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[300]),
    backgroundColor: green[300],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

export type Project = {
  id: number;
  name: string;
};
export type Department = {
  id: number;
  name: string;
  projects: Project[];
};

interface IReportInterface {
  id: number;
  sumTime: string;
  notes: string;
  project: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    username: string;
  };
}

export class CReport implements IReportInterface {
  id: number;
  sumTime: string;
  notes: string;
  project: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    username: string;
  };

  constructor() {
    this.id = 0;
    this.sumTime = "";
    this.notes = "";
    this.project = {
      id: 0,
      name: "",
    };
    this.user = {
      id: 0,
      username: "",
    };
  }
}

export interface ISendReportsInterface {
  reports: CReport[];
  status: boolean;
  timeFromReports: number;
  timeNorm: number;
  orionTime: number;

  getAlltime(): void;
}

export class CSendReports implements ISendReportsInterface {
  reports: CReport[];
  status: boolean;
  timeFromReports: number;
  timeNorm: number;
  orionTime: number;

  constructor(structure?: ISendReportsInterface) {
    this.reports = (structure && structure.reports) || [];
    this.status = (structure && structure.status) || false;
    this.timeFromReports = (structure && structure.timeFromReports) || 0;
    this.timeNorm = (structure && structure.timeNorm) || 0;
    this.orionTime = (structure && structure.orionTime) || 0;
  }

  public getAlltime() {
    let sum = 0;
    this.reports.forEach((element) => {
      sum += parseInt(element.sumTime);
    });
    this.timeFromReports = sum;
  }
}

export interface State extends SnackbarOrigin {
  open: boolean;
}

export interface CardType {
  project: string;
  hours: string;
  info: string;
  id: number;
}

interface SendReportFormType {
  project: string;
  hours: string;
  info: string;
}

const UserReport = () => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const classes = useStyles();
  const token = localStorage.getItem("token") as string;
  const [isEdit, setIsEdit] = useState(false);
  const [selectReport, setSelectReport] = useState<CReport | undefined>();
  const [reportsMan, setReports] = useState<CSendReports | undefined>();
  const [errorText, setErrorText] = useState("");
  const [cards, setCards] = useState<CardType[]>([]);
  const [sendReportForm, setSendReportForm] = useState<SendReportFormType>({
    project: "",
    hours: "",
    info: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReportForm = {
      ...sendReportForm,
      [e.target.name]: e.target.value,
    };
    setSendReportForm(newReportForm);
    updateCard({ card: newReportForm });
  };
  const updateCard = ({
    card,
    isSubmitEvent,
  }: {
    card: Omit<CardType, "id">;
    isSubmitEvent?: boolean;
  }) => {
    const existCard = cards.find((c) => c.project === card.project);
    if (existCard) {
      const newCards = cards.map((c) => {
        if (c.project === existCard.project) {
          c.hours = card.hours;
        }
        return c;
      });
      setCards([...newCards]);
      return;
    }

    if (!isSubmitEvent) return;

    setCards([...cards, { ...card, id: Math.random() }]);
  };
  const removeCard = (id: number) => {
    setCards([...cards.filter((c) => c.id !== id)]);
  };

  const handleSelectChange = (e: SyntheticEvent<Element, Event>) => {
    setSendReportForm({
      ...sendReportForm,
      project: (e.target as HTMLElement).innerText,
    });
  };

  const projectReport = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSendReportForm({
      ...sendReportForm,
      info: e.currentTarget.value,
    });
  };

  const onClickDeleteCard = (id: number, index: number) => {
    const tempReports: CSendReports = { ...reportsMan } as CSendReports;
    ReportsApi.deleteCard(tempReports.reports[index], token).then((result) => {
      const tempWorkTime = parseInt(tempReports.reports[index].sumTime);
      tempReports.timeFromReports -= tempWorkTime;
      tempReports.reports.splice(index, 1);
      const report = new CReport();
      setReports(tempReports);
      setSelectReport(report);
    });
  };

  const onClickCard = (index: number) => {
    if (isEdit) {
      if (!window.confirm("потеря данных")) {
        return;
      }
    }
    const temp = reportsMan?.reports[index];
    setIsEdit(false);
    setSelectReport(temp);
  };

  const isDisabledAddProjectBtn = () => {
    return (
      Object.values(sendReportForm).some((v) => !v) ||
      !/^((0|[1-9]\d*)([.]\d+)|([1-9]\d*))$/.test(sendReportForm.hours)
    );
  };

  const sumAllHours = () => cards.reduce((acc, c) => acc + +c.hours, 0);

  return (
    <Grid>
      <h3 className="text-left">Отчет о проделанной работе</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Paper className="report" variant="outlined">
            <div className="block1">
              <h6 className="textLeft">
                <strong>Список проектов</strong>
              </h6>
              <hr />
              <ProjectList
                status={reportsMan?.status}
                onClickDeleteCard={onClickDeleteCard}
                onClickCard={onClickCard}
                reports={reportsMan?.reports}
                cardList={cards}
                onCardDelete={removeCard}
              />
            </div>
            <label className="addProject">
              {reportsMan?.status ? (
                ""
              ) : (
                <ButtonSuccess
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  size="small"
                  onClick={() =>
                    updateCard({ card: sendReportForm, isSubmitEvent: true })
                  }
                >
                  Добавить проект
                </ButtonSuccess>
              )}
            </label>
            <br />
            <br />
            <br />
            <Card variant="outlined">
              <CardContent className="summary">
                <p className="hours">{sumAllHours()}</p>
                <p className="sum">ИТОГО</p>
                <br />
                <p className="hours">{reportsMan?.orionTime} ч.</p>
                <p className="sum">ВРЕМЯ ПО КАРТОЧКЕ</p>
                <br />
                <p className="hours"> {reportsMan?.timeNorm} ч.</p>
                <p className="sum">НОРМА</p>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid>
          <Paper className="report" variant="outlined">
            <div className="block2">
              <p className="textLeft">
                <strong>Проект:</strong>
              </p>
              <br />
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <DropDownList
                  onChange={handleSelectChange}
                  value={sendReportForm.project}
                />
                {!sendReportForm.project && (
                  <div className="input__error">Введите название проекта</div>
                )}
              </Box>
              <br />
              <br />

              <p className="textLeft">
                <strong>Часы:</strong>
              </p>
              <br />
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  type={"number"}
                  fullWidth
                  label="введите количество часов"
                  value={sendReportForm.hours}
                  name={"hours"}
                  onChange={onChange}
                />
                {!sendReportForm.hours && (
                  <div className="input__error">Введите количество часов</div>
                )}
                {sendReportForm.hours &&
                  !/^((0|[1-9]\d*)([.]\d+)|([1-9]\d*))$/.test(
                    sendReportForm.hours
                  ) && (
                    <div className="input__error">
                      Количество часов должно быть больше нуля
                    </div>
                  )}
              </Box>
              <br />
              <br />
              <p className="textLeft">
                <strong>Состав работ:</strong>
              </p>
              <br />
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <FormTextArea
                  value={sendReportForm.info}
                  onChange={projectReport}
                />
                {!sendReportForm.info && (
                  <div className="input__error">Введите отчет</div>
                )}
              </Box>
              <hr className="normal" />
              <br />
              {reportsMan?.status ? (
                ""
              ) : (
                <p className="textRight">
                  <ButtonSuccess
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    disabled={isDisabledAddProjectBtn()}
                    onClick={() =>
                      updateCard({ card: sendReportForm, isSubmitEvent: true })
                    }
                  >
                    Сохранить
                  </ButtonSuccess>
                </p>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserReport;
