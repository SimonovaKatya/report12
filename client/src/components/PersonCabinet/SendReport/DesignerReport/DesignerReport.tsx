import React, { useEffect, useState, useRef } from "react";
import DesProjectsList from "./DesProjectsList/DesProjectsList";
import DesignerCards from "./DesignerCards/DesignerCards";
import { TreeSelect } from "antd";
import "./DesignerReport.css";
import { ReportsApi } from "../../../../api";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { green, red } from "@material-ui/core/colors";
import { GridSpacing } from "@material-ui/core/Grid";

const ButtonSuccess = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[300]),
    backgroundColor: green[300],
    "&:hover": {
      backgroundColor: green[300],
    },
  },
}))(Button);

export const DeleteButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red[300]),
    backgroundColor: red[300],
    "&:hover": {
      backgroundColor: red[300],
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    grid: {
      flexGrow: 1,
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "10ch",
      },
    },
  })
);

export type NoteJson = {
  id: number;
  text: string;
  time: string;
  archive: string;
  percent: string;
};

interface ISelectReportInterface {
  id: number;
  user: {
    id: number;
    username: string;
  };
  project: {
    id: number;
    name: string;
    direction: {
      id: number;
      name: string;
    };
  };
  block: boolean;
  notes: NoteJson[];
  sumTime: string;
  sumArchive: string;
}

export class CSelectReport implements ISelectReportInterface {
  id: number;
  user: {
    id: number;
    username: string;
  };
  project: {
    id: number;
    name: string;
    direction: {
      id: number;
      name: string;
    };
  };
  block: boolean;
  notes: NoteJson[];
  sumTime: string;
  sumArchive: string;

  constructor() {
    this.id = 0;
    this.user = {
      id: 0,
      username: "",
    };
    this.project = {
      id: 0,
      name: "",
      direction: {
        id: 0,
        name: "",
      },
    };
    this.block = false;
    this.notes = [];
    this.sumTime = "";
    this.sumArchive = "";
  }
}

export interface IReportsInterface {
  reports: CSelectReport[];
  status: boolean;
  timeFromReports: number;
  timeNorm: number;
  orionTime: number;
}

export class CReports implements IReportsInterface {
  reports: CSelectReport[];
  status: boolean;
  timeFromReports: number;
  timeNorm: number;
  orionTime: number;

  constructor(structure?: IReportsInterface) {
    this.reports = (structure && structure.reports) || [];
    this.status = (structure && structure.status) || false;
    this.timeFromReports = (structure && structure.timeFromReports) || 0;
    this.timeNorm = (structure && structure.timeNorm) || 0;
    this.orionTime = (structure && structure.orionTime) || 0;
  }
}

export type Project = {
  id: number;
  name: string;
};
export type Department = {
  id: number;
  name: string;
  projects: Project[];
};

const { TreeNode } = TreeSelect;

export interface State extends SnackbarOrigin {
  open: boolean;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IProps {
  chosenDate: Date;
}

const DesignerReport = (props: IProps) => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const classes = useStyles();
  const [errorText, setErrorText] = useState("");
  const token = localStorage.getItem("token") as string;
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [report, setReport] = useState<CReports | undefined>();
  const [selectReport, setSelectReport] = useState<CSelectReport | undefined>();
  const [directions, setDirections] = useState<Department[] | undefined>();
  const [test, setTest] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (!token) {
      history.push("/");
      return;
    }
    const init = async () => {
      const struct = await ReportsApi.getDirections(token);
      const reports = await ReportsApi.getDesignerReports(
        token,
        (props.chosenDate.getMonth() + 1).toString(),
        props.chosenDate.getFullYear().toString()
      );
      const date = JSON.stringify({
        month: (props.chosenDate.getMonth() + 1).toString(),
        year: props.chosenDate.getFullYear().toString(),
      });
      localStorage.setItem("date", date);
      setIsEdit(false);
      const reports2 = new CReports(reports);
      setReport(reports2);
      setDirections(struct);
      // Выбор первого отчета
      setIsEdit(false);
      setSelectReport(reports2?.reports[0]);
    };
    init().then();
  }, [props.chosenDate]);

  const onClickNewProject = () => {
    if (isEdit && !window.confirm("потеря данных")) {
      return;
    }
    const report = new CSelectReport();
    setSelectReport(report);
    setIsEdit(false);
  };
  const onChangeSelect = (nameField: string, full: any, direc: any) => {
    const report: CSelectReport = { ...selectReport } as CSelectReport;
    report.project = { name: nameField, id: full, direction: direc };
    setSelectReport(report);
    setIsEdit(true);
  };

  function getAlltime(reportsTemp: CReports, time: number) {
    let sum = 0;
    reportsTemp.reports.forEach((element) => {
      sum += parseInt(element.sumTime);
    });
    time = reportsTemp.timeFromReports;
    reportsTemp.timeFromReports = sum;
    return reportsTemp.timeFromReports;
  }

  function isValid(reportsTemp: CSelectReport, newState: SnackbarOrigin) {
    if (
      !reportsTemp.project ||
      !reportsTemp.sumTime ||
      !reportsTemp.notes ||
      parseInt(reportsTemp.sumTime) == 0 ||
      typeof reportsTemp.sumTime == "number"
    ) {
      reportsTemp.sumTime = reportsTemp.sumTime.replace(/[^\d]/g, "");
      setState({ open: true, ...newState });
      setErrorText("Заполните все поля!");
      return true;
    }
    return false;
  }

  const onSaveReport = (newState: SnackbarOrigin) => {
    const _reports: CReports = { ...report } as CReports;
    let _selectReport: CSelectReport = { ...selectReport } as CSelectReport;
    if (!isValid(_selectReport, newState)) {
      if (_selectReport.id) {
        ReportsApi.editConstrReport(_selectReport, token)
          .then((result) => {
            for (let i = 0; i < _reports.reports.length; i++) {
              if (_reports.reports[i].id === _selectReport.id) {
                _reports.reports[i] = _selectReport;
                getAlltime(_reports, _reports.timeFromReports);
              }
            }
            setSelectReport(_selectReport);
            setReport(_reports);
            setIsEdit(false);
            history.push("/cabinet/reports");
          })
          .catch((error) => alert(error));
      } else {
        ReportsApi.createConstrReport(_selectReport, token)
          .then((result) => {
            _selectReport = result as CSelectReport;
            _reports.reports.push(_selectReport);
            _reports.timeFromReports += parseInt(_selectReport.sumTime);
            console.log(_selectReport.sumTime);
            setReport(_reports);
            setSelectReport(_selectReport);
            setIsEdit(false);
            history.push("/cabinet/reports");
          })
          .catch((error) => alert(error));
      }
    }
  };

  const onClickCard = (index: number) => {
    if (isEdit) {
      if (!window.confirm("потеря данных")) {
        return;
      }
    }
    const temp = report?.reports[index];
    setIsEdit(false);
    setSelectReport(temp);
  };
  const onClickDeleteCard = (id: number, index: number) => {
    const tempReports: CReports = { ...report } as CReports;
    ReportsApi.deleteConstrCard(tempReports.reports[index], token).then(
      (result) => {
        const tempWorkTime = parseInt(tempReports.reports[index].sumTime);
        tempReports.timeFromReports -= tempWorkTime;
        tempReports.reports.splice(index, 1);
        const report = new CSelectReport();
        setReport(tempReports);
        setSelectReport(report);
      }
    );
  };

  const onClickPlusMinusAdd = (flag: any, index: any) => {
    const tempReport: CSelectReport = { ...selectReport } as CSelectReport;
    if (flag === "+") {
      if (tempReport.notes) {
        tempReport.notes.push({
          id: 0, //???
          text: "",
          time: "",
          archive: "",
          percent: "",
        });
      } else {
        tempReport.notes = [
          {
            id: 0, //???
            text: "",
            time: "",
            archive: "",
            percent: "",
          },
        ];
      }
    } else if (flag === "-") {
      tempReport.notes = [];
    } else if (flag === "del") {
      tempReport.notes.slice(index, 1);
    }
    setSelectReport(tempReport);
    setIsEdit(isEdit);
  };

  const onChangeFields = (
    nameField: string,
    e: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const tempReport = { ...selectReport } as CSelectReport;
    switch (nameField) {
      case "hours":
        tempReport.sumTime = e.currentTarget.value;
        break;
      case "arch":
        tempReport.sumArchive = e.currentTarget.value;
        break;
      case "body_comment":
        tempReport.notes[index].text = e.currentTarget.value;
        break;
      case "hours_comment":
        tempReport.notes[index].time = e.currentTarget.value;
        break;
      case "percent":
        tempReport.notes[index].percent = e.currentTarget.value;
        break;
      case "list_archiv":
        tempReport.notes[index].archive = e.currentTarget.value;
        break;
    }
    setSelectReport(tempReport);
    setIsEdit(isEdit);
  };
  return (
    <div>
      {props.chosenDate && (
        <h3 className="text-left">
          Отчет о проделанной работе:{" "}
          {props.chosenDate.toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric",
          })}
        </h3>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Paper className="report" variant="outlined">
            <div className="block1">
              <h6 className="textLeft">
                <strong>Список проектов</strong>
              </h6>
              <hr />
              <DesProjectsList
                status={report?.status}
                reports={report?.reports}
                onClickCard={onClickCard}
                onClickDeleteCard={onClickDeleteCard}
              />
            </div>
            <label className="addProject">
              {report?.status ? (
                ""
              ) : (
                <ButtonSuccess
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onClickNewProject}
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
                <p className="hours">{report?.timeFromReports}</p>
                <p className="sum">ИТОГО</p>
                <br />
                <p className="hours">{report?.orionTime} ч.</p>
                <p className="sum">ВРЕМЯ ПО КАРТОЧКЕ</p>
                <br />
                <p className="hours"> {report?.timeNorm} ч.</p>
                <p className="sum">НОРМА</p>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className="report" variant="outlined">
            <div className="block2">
              <p className="textLeft">
                <strong>Проект:</strong>
              </p>
              <TreeSelect
                showSearch
                value={selectReport?.project.name} //Возможно id
                onChange={onChangeSelect}
                disabled={report?.status}
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                allowClear
                treeDefaultExpandAll
              >
                {directions?.map((item: Department, key: number) => {
                  return (
                    <TreeNode title={item.name} value={item.id}>
                      {item?.projects.map((item: Project, key: number) => {
                        return <TreeNode title={item.name} value={item.id} />;
                      })}
                    </TreeNode>
                  );
                })}
              </TreeSelect>
              <br />
              <br />
              <br />
              <div className="hoursArch">
                <div className="hoursArch">
                  <Grid container className={classes.grid} spacing={2}>
                    <Grid item xs={12}>
                      <Grid container justify="flex-start" spacing={spacing}>
                        <Grid>
                          <label className="textLeft">
                            <strong>Часы:</strong>
                          </label>
                          <input
                            readOnly={report?.status}
                            placeholder="Часы"
                            onChange={(e: any) =>
                              onChangeFields("hours", e, undefined)
                            }
                            value={selectReport?.sumTime || ""}
                            type="number"
                          />
                        </Grid>
                        <Grid>
                          <label className="textLeft">
                            <strong>Архив:</strong>
                          </label>
                          <input
                            readOnly={report?.status}
                            placeholder="Архив"
                            onChange={(e: any) =>
                              onChangeFields("arch", e, undefined)
                            }
                            value={selectReport?.sumArchive || ""}
                            type="number"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <br />
              <br />
              <br />
              <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={8}>
                  <Grid container justify="flex-start" spacing={spacing}>
                    <Grid>
                      <DesignerCards
                        status={report?.status}
                        reports={report?.reports}
                        onChangeFields={onChangeFields}
                        notes={selectReport?.notes}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container justify="center" spacing={spacing}>
                    <Grid>
                      {report?.status ? (
                        ""
                      ) : (
                        <div className="add-delete">
                          <ButtonSuccess
                            onClick={() => onClickPlusMinusAdd("+", undefined)}
                            style={{ marginRight: "10px" }}
                          >
                            +
                          </ButtonSuccess>
                          <DeleteButton
                            onClick={() => onClickPlusMinusAdd("-", undefined)}
                            style={{ marginRight: "10px" }}
                            color="primary"
                          >
                            -
                          </DeleteButton>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <br />
              <hr className="normal" />
              {errorText ? (
                <div>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                  >
                    <Alert onClose={handleClose} severity="error">
                      Заполните все поля!
                    </Alert>
                  </Snackbar>
                </div>
              ) : (
                ""
              )}
              <br />
              {report?.status ? (
                ""
              ) : (
                <p className="textRight">
                  <ButtonSuccess
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      onSaveReport({ vertical: "top", horizontal: "right" });
                    }}
                  >
                    Сохранить
                  </ButtonSuccess>
                </p>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DesignerReport;
