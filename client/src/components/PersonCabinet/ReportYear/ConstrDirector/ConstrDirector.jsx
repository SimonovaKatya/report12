import React from "react";
import { Card, Table } from "react-bootstrap";
import { Select, Checkbox, DatePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class ConstrDirector extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Card>
          <Card.Body>
            <Card.Title className="text-left">Сотрудники</Card.Title>
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  defaultValue={["a10", "c12"]}
                  onChange={handleChange}
                  placeholder="Выбрать сотрудника"
                  className="text-left"
                >
                  {children}
                </Select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-2 text-left">
                <Checkbox onChange={onChange}>Выбрать всех</Checkbox>
              </div>
            </div>
            <br />
            <div className="col-lg-12">
              <hr />
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-2 text-left">
                <Card.Title>Временной промежуток</Card.Title>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 col-lg-6 text-left">
                <DatePicker
                  onChange={onChange}
                  picker="month"
                  placeholder="Месяц"
                  style={{ marginRight: "15px", marginBottom: "15px" }}
                />
                <DatePicker
                  onChange={onChange}
                  picker="month"
                  placeholder="Месяц"
                />
              </div>
            </div>
            <br />
            <div className="col-lg-12">
              <hr />
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-2 text-left">
                <Card.Title>Проекты</Card.Title>
              </div>
            </div>
            {/* <br/> */}
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <Select
                  mode="tags"
                  allowClear
                  className="text-left"
                  placeholder="Выберите направление"
                  style={{ width: "100%" }}
                ></Select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <Select
                  mode="tags"
                  allowClear
                  className="text-left"
                  placeholder="Выберите проект"
                  style={{ width: "100%" }}
                ></Select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-3 col-lg-4 text-left">
                <Checkbox onChange={onChange}>
                  Показывать незаблокированные отчеты
                </Checkbox>
              </div>
            </div>
            <br />
            <div className="text-left">
              <button
                className="btn btn-success btn-sm"
                style={{ marginRight: "5px" }}
              >
                Сгенерировать таблицу
              </button>
              <button className="btn btn-primary btn-sm">
                Экспорт в Excel
              </button>
            </div>
          </Card.Body>
        </Card>
        <br />
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">Направление</th>
              <th scope="col">№</th>
              <th scope="col">Проект</th>
              <th scope="col">Выполненные работы</th>
              <th scope="col">Часы</th>
              <th scope="col">Архив</th>
              <th scopw="col">%</th>
              <th scope="col">Месяц</th>
            </tr>
            <tr>
              <th colspan="8">ФИО</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="6" scope="rowgroup">
                НИОКР
              </td>
              <td rowspan="3" scope="rowgroup">
                1
              </td>
              <td rowspan="3" scopw="rowgroup">
                Модули на склад
              </td>
              <td>Модуль 1</td>
              <td>12</td>
              <td>13</td>
              <td>100</td>
              <td>Сентябрь</td>
            </tr>
            <tr>
              <td>21223</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
            </tr>
            <tr>
              <td>21223</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
            </tr>
            <tr>
              <td rowspan="3" scope="rowgroup">
                1
              </td>
              <td rowspan="3" scopw="rowgroup">
                Модули на склад
              </td>
              <td>Модуль 1</td>
              <td>12</td>
              <td>13</td>
              <td>100</td>
              <td>Сентябрь</td>
            </tr>
            <tr>
              <td>21223</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
            </tr>
            <tr>
              <td>21223</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
              <td>12345</td>
            </tr>
            <tr>
              <td rowspan="6" scope="rowgroup">
                НИОКР
              </td>
              <td rowspan="3" scope="rowgroup">
                1
              </td>
              <td rowspan="3" scopw="rowgroup">
                Модули на склад
              </td>
              <td>Модуль 1</td>
              <td>12</td>
              <td>13</td>
              <td>100</td>
              <td>Сентябрь</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ConstrDirector;
