import React from "react";
import { CSelectReport, NoteJson } from "../DesignerReport";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

type DesignerCardsProps = {
  status: boolean | undefined;
  reports: CSelectReport[] | undefined;
  onChangeFields(nameField: string, e: any, index: any): void;
  notes: NoteJson[] | undefined;
};

const DesignerCards = (props: DesignerCardsProps) => {
  return (
    <div>
      {props.notes?.map((cards: NoteJson, index: number) => {
        return (
          <Card variant="outlined">
            <CardContent>
              <div>
                <p className="textLeft">
                  <strong>Проблемы и комментарии</strong>
                </p>
                <textarea
                  readOnly={props.status}
                  onChange={(e) =>
                    props.onChangeFields("body_comment", e, index)
                  }
                  className="form-control"
                  value={cards.text}
                  rows={6}
                />
              </div>
              <br />
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="Label1">
                    <strong>Ч</strong>
                  </label>
                  <input
                    readOnly={props.status}
                    type="number"
                    onChange={(e) =>
                      props.onChangeFields("hours_comment", e, index)
                    }
                    value={cards.time}
                    className="form-control"
                    id="hour"
                    pattern="^[0-9]+$"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="Label1">
                    <strong>%</strong>
                  </label>
                  <input
                    readOnly={props.status}
                    type="number"
                    onChange={(e) => props.onChangeFields("percent", e, index)}
                    value={cards.percent}
                    className="form-control"
                    id="percent"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="Label1">
                    <strong>Листов в архив</strong>
                  </label>
                  <input
                    readOnly={props.status}
                    type="number"
                    onChange={(e) =>
                      props.onChangeFields("list_archiv", e, index)
                    }
                    value={cards.archive}
                    className="form-control"
                    id="paper"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DesignerCards;
