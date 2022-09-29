import React from "react";
import { Table } from "react-bootstrap";

const BodyReport = (props) => {
  return props.reports.map((item, key) => {
    return (
      <tr>
        <td style={{ whiteSpace: "pre-wrap" }}>{item.project.label}</td>
        <td style={{ whiteSpace: "pre-wrap" }}>{item.note.task}</td>
        <td style={{ whiteSpace: "pre-wrap" }}>
          Плановые:{"\n" + item.note.timing_sch + "\n"} Фактические:
          {"\n" + item.note.timing_act}
        </td>
        <td style={{ whiteSpace: "pre-wrap" }}>{item.note.analys}</td>
      </tr>
    );
  });
};

const EditReport = (props) => {
  return (
    <div className="container-fluid">
      <div className="col-md-12 col-lg-12">
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Проект</th>
              <th scope="col">Отчет</th>
              <th scope="col">Сроки</th>
              <th scope="col">Проблемы</th>
            </tr>
          </thead>
          <tbody>
            <BodyReport reports={props.personReport} />
          </tbody>
        </Table>

        <div className="text-right">
          {props.block === "ban" ? (
            <button
              onClick={props.onClickBlock.bind(this, props.perconId, "unlock")}
              className="btn btn-success btn-sm"
            >
              Разблокировать
            </button>
          ) : (
            <button
              onClick={props.onClickBlock.bind(this, props.perconId, "ban")}
              className="btn btn-danger btn-sm"
            >
              Блокировать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditReport;
