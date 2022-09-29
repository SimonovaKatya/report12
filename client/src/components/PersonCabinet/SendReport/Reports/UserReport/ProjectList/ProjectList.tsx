import React from "react";
import "./ProjectList.css";
import Button from "@material-ui/core/Button";
import { CardType, CReport } from "../UserReport";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const DeleteButton = withStyles((theme: Theme) => ({
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
    margin: {
      margin: theme.spacing(1),
    },
  })
);

type ProjectListProps = {
  status: boolean | undefined;
  reports: CReport[] | undefined;
  onClickCard(index: number): void;
  onClickDeleteCard(id: number, index: number): void;
  cardList: CardType[];
  onCardDelete: (id: number) => void;
};

const ProjectList = ({
  cardList,
  onCardDelete,
  ...props
}: ProjectListProps) => {
  const classes = useStyles();
  return (
    <div id="proj-list">
      {cardList.map(({ id, hours, info, project }, index) => {
        return (
          <Card className="card" key={id}>
            <CardContent>
              <div className="cardDetails">
                <div style={{ padding: "5px" }} className="text-left">
                  <strong>№{index + 1} </strong>
                  <br />
                  {project}
                  <div className="worktime">
                    <AccessTimeIcon
                      fontSize="small"
                      style={{ fontSize: "17px" }}
                    />
                    {hours} ч.
                  </div>
                  <strong>№{index + 1} </strong>
                  <br />
                  {info}
                </div>
                <DeleteButton
                  variant="contained"
                  color="primary"
                  className="deleteButton"
                  size="small"
                  onClick={() => onCardDelete(id)}
                >
                  Удалить
                </DeleteButton>
              </div>
            </CardContent>
          </Card>
        );
      })}
      {props.reports?.map((cardReport: CReport, index: number) => {
        return (
          <Card
            className="card"
            onClick={() => {
              props.onClickCard(index);
            }}
          >
            <CardContent>
              <div className="cardDetails">
                <div style={{ padding: "5px" }} className="text-left">
                  <strong>№{index + 1} </strong>
                  <br />
                  {cardReport?.project?.name}
                  <div className="worktime">
                    <AccessTimeIcon
                      fontSize="small"
                      style={{ fontSize: "17px" }}
                    />
                    {cardReport?.sumTime} ч.
                  </div>
                </div>
                {props.status ? (
                  ""
                ) : (
                  <div
                    className="buttonDelete"
                    style={{ paddingRight: "5px", paddingBottom: "10px" }}
                  >
                    <DeleteButton
                      variant="contained"
                      color="primary"
                      className={classes.margin}
                      size="small"
                      onClick={() =>
                        props.onClickDeleteCard(cardReport.id, index)
                      }
                    >
                      Удалить
                    </DeleteButton>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProjectList;
