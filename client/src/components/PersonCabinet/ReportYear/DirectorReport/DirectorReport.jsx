import React from "react";
import { Card, ButtonGroup, Button, Table } from "react-bootstrap";
import { Select, Spin } from "antd";

const Reports = (props) => {
  let i = 0;
  return props.reports.map((item, key) => {
    if (item.name) {
      i++;
      return (
        <tr>
          <td>{i}</td>
          <td>
            <a
              onClick={props.showModalVisible.bind(
                this,
                item.pk,
                item.has_report,
                "1",
                key
              )}
            >
              {item.name}
            </a>
          </td>
          <td>{item.has_report ? "Непустой" : ""}</td>
          <td>{item.checked}</td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan="4" scope="colgroup" className="table-secondary">
          {item.label}
        </td>
      </tr>
    );
  });
};

const DirectorReport = (props) => {
  return (
    <div className="container-fluid">
      <Card>
        <Card.Body>
          <Card.Title className="text-left">Параметры отображения</Card.Title>
          <div className="row">
            <div className="col-md-5 text-left">
              <Select
                onChange={props.onChangeDepartment}
                value={props.data.selectDepartment.label}
                options={props.data.departments}
                style={{ width: "100%" }}
                placeholder="Департамент"
              ></Select>
            </div>
            <br />
          </div>
          <br />
          <div className="row">
            <div className="col-md-5 text-left">
              <Select
                onChange={props.onChangeSubdepartment}
                value={props.data.selectSubdepartment.label}
                options={props.data.subdepartments}
                style={{ width: "100%" }}
                placeholder="Подразделение"
              ></Select>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div className="row text-left">
        <div className="col-md-10 ">
          <ButtonGroup
            className="flex-wrap"
            aria-label="Basic example"
            size="sm"
          >
            <Button
              onClick={props.onClickLock.bind(this, "ban")}
              variant="danger"
            >
              Заблокировать всех
            </Button>
            <Button
              onClick={props.onClickLock.bind(this, "unlock")}
              variant="success"
            >
              Разблокировать всех
            </Button>
            <Button
              onClick={props.showModalVisible.bind(this, "2")}
              variant="warning"
            >
              Редактировать свой отчет
            </Button>
            <Button variant="primary">Выгрузить в Word</Button>
          </ButtonGroup>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3 text-left">
          <label style={{ fontSize: "20px" }}>Список исполнителей</label>
        </div>
      </div>
      <br />
      <Spin spinning={props.data.loading}>
        <div className="row">
          <div className="col-lg-12">
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th scope="col">№ п/п</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Непустой</th>
                  <th>Блокировал</th>
                </tr>
              </thead>
              <tbody>
                <Reports
                  showModalVisible={props.showModalVisible}
                  reports={props.data.reports}
                />
              </tbody>
            </Table>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default DirectorReport;
