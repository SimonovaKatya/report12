import React from "react";
import "./DesProjectsList.css";
import { CSelectReport } from "../DesignerReport";
import "./DesProjectsList.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { DeleteButton } from "../DesignerReport";
import "./DesProjectsList.css";

export type ProjectDesignerListProps = {
  status: boolean | undefined;
  reports: CSelectReport[] | undefined | null;
  onClickCard(index: number): void;
  onClickDeleteCard(id: number, index: number): void;
};

const DesProjectList = (props: ProjectDesignerListProps) => {
  return (
    <div>
      {props.reports?.map((designerReport: CSelectReport, index: number) => {
        console.log(designerReport);
        return (
          <Card className="card" onClick={() => props.onClickCard(index)}>
            <CardContent style={{ padding: "15px" }} className="text-left">
              <div className="cardDetails">
                <strong>№ {designerReport.project.id}</strong>
                <br />
                {designerReport.project.name}
                <br />
                {designerReport.sumTime} ч.
                {props.status ? (
                  ""
                ) : (
                  <div
                    className="text-right"
                    style={{ paddingRight: "5px", paddingBottom: "10px" }}
                  >
                    <DeleteButton
                      size="small"
                      onClick={() =>
                        props.onClickDeleteCard(designerReport.id, index)
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

export default DesProjectList;
