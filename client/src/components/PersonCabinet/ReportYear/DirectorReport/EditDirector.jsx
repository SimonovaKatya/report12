import React from "react";
import { Card, Select, Row, Col, Button, TreeSelect } from "antd";
import EmptyReport from "../EmptyReport";

const gridStyle = {
  width: "100%",
  textAlign: "left",
};
const EditDirector = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <label className="col-sm-1" className="Label1">
            <strong>Основные достижения сотрудников:</strong>
          </label>
          <textarea
            className="form-control"
            maxlength="10000"
            placeholder="Разработка новой технологии, повышение квалификации и др..."
            rows="3"
          ></textarea>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <label className="col-sm-1" className="Label1">
            <strong>Краткие итоги и предложения:</strong>
          </label>
          <textarea
            className="form-control"
            maxlength="10000"
            placeholder="Краткие итоги по организационным и управленческим изменениям департамента и предприятия. Предложения
                    по улучшению и оптимизации..."
            rows="3"
          ></textarea>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <label className="col-sm-1" className="Label1">
            <strong>Цели и задачи на следующий год:</strong>
          </label>
          <textarea
            className="form-control"
            maxlength="10000"
            placeholder="Цели и задачи на следующий год..."
            rows="3"
          ></textarea>
        </div>
      </div>
      <EmptyReport />
    </div>
  );
};

export default EditDirector;
