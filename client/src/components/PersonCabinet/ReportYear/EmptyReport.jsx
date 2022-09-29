import React from "react";
import { Collapse, TreeSelect, Button } from "antd";
import ProjectListYear from "./ProjectListYear/ProjectListYear";
import * as constants from "../../../constants";
const { TreeNode } = TreeSelect;
const { Panel } = Collapse;

class EmptyReport extends React.Component {
  state = {
    select_report: {
      project: { label: "" },
      note: {
        task: "",
        timing_sch: "",
        timing_act: "",
        analys: "",
      },
    },
    block: false,
    projects: [],
    reports: [],
    is_edit: false,
    select_index: "",
  };

  componentDidMount() {
    this.loadProjectReports();
  }
  onClickCard = (index) => {
    if (this.state.is_edit) {
      if (!window.confirm("потеря данных")) {
        return;
      }
    }
    let project = this.state.reports[index];
    this.setState({
      select_report: project,
      select_index: index,
      is_edit: false,
    });
  };
  loadProjectReports = () => {
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = "${constants.PATH}directions/structure/";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ projects: result });
      });
    url = `${constants.PATH}/api/reports/years?year=${date.year}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ reports: result.reports });
        if (result.length > 1) {
          this.setState({ select_report: result[result.length - 1] });
        }
      });
  };
  onClickNewProject = () => {
    if (this.state.is_edit) {
      if (!window.confirm("потеря данных")) {
        return;
      }
    }
    let temp = {
      project: { label: "" },
      note: {
        task: "",
        timing_sch: "",
        timing_act: "",
        analys: "",
      },
    };
    this.setState({ select_report: temp, select_index: "", is_edit: false });
  };
  onChangeProject = (nameField, full, e) => {
    let report = { ...this.state.select_report };
    report.project = { value: nameField, label: full[0] };
    this.setState({ select_report: report, is_edit: true });
  };
  onChangeReport = (e) => {
    let temp = { ...this.state.select_report };
    temp.note.task = e.target.value;
    this.setState({ select_report: temp });
    if (!this.state.is_edit) {
      this.setState({ is_edit: true });
    }
  };
  onChangePlan = (e) => {
    let temp = { ...this.state.select_report };
    temp.note.timing_sch = e.target.value;
    this.setState({ select_report: temp });
    if (!this.state.is_edit) {
      this.setState({ is_edit: true });
    }
  };
  onChangeFact = (e) => {
    let temp = { ...this.state.select_report };
    temp.note.timing_act = e.target.value;
    this.setState({ select_report: temp });
    if (!this.state.is_edit) {
      this.setState({ is_edit: true });
    }
  };
  onChangeAnaliz = (e) => {
    let temp = { ...this.state.select_report };
    temp.note.analys = e.target.value;
    this.setState({ select_report: temp });
    if (!this.state.is_edit) {
      this.setState({ is_edit: true });
    }
  };
  onClickDeleteCard = (index) => {
    let token = localStorage.getItem("token");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    let requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = `${constants.PATH}report/years/${this.state.reports[index].value}`;
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let reports = [...this.state.reports];
        reports.splice(index, 1);
        this.setState({ reports: reports });
        if (index === this.state.select_index) {
          let temp = {
            project: { label: "" },
            note: {
              task: "",
              timing_sch: "",
              timing_act: "",
              analys: "",
            },
          };
          this.setState({ select_report: temp, select_index: "" });
        }
      });
  };
  onClickGenaration = () => {
    if (this.state.is_edit || this.state.reports.length > 0) {
      if (!window.confirm("потеря данных")) {
        return;
      }
    }
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));

    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${constants.PATH}reports/years/generate/?year=${date.year}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let temp = {
          project: { label: "" },
          note: {
            tasks: "",
            timing_sch: "",
            timing_act: "",
            analys: "",
          },
        };
        this.setState({ reports: result.reports });
        if (result.length > 1) {
          this.setState({
            select_report: result[result.length - 1],
            select_index: result.length - 1,
          });
        }
      });
  };
  onClickSaveProject = () => {
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));

    let myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    let formdata = new FormData();
    formdata.append("note", JSON.stringify(this.state.select_report.note));
    formdata.append("project", this.state.select_report.project.value);
    formdata.append("year", date.year);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    if (this.state.select_report.value) {
      const url = `${constants.PATH}reports/years/${this.state.select_report.value}/`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let temp = [...this.state.reports];
          temp[this.state.select_index] = result;
          this.setState({ reports: temp, is_edit: false });
        });
    } else {
      const url = `${constants.PATH}reports/years/`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let temp = [...this.state.reports];
          temp.push(result);
          this.setState({ reports: temp, is_edit: false });
        });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="text-left" style={{ fontSize: "25px" }}>
          <h5>Годовой отчет</h5>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Collapse ghost>
              <Panel
                header="Помощь"
                key="1"
                className="text-right"
                showArrow={false}
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div class="alert alert-primary text-left">
                      Важно! <br />
                      Автоматически созданный отчет необходимо обязательно
                      отредактировать.
                      <br />
                      Итоговый отчет должен представлять из себя аналитику Вашей
                      работы за год, а не копию ежемесячных отчетов.
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div class="alert alert-primary text-left">
          Важно! <br />
          Автоматически созданный отчет необходимо обязательно отредактировать.
          <br />
          Итоговый отчет должен представлять из себя аналитику Вашей работы за
          год, а не копию ежемесячных отчетов.
        </div>
        <div className="text-left">
          <Button onClick={this.onClickGenaration} variant="success" size="sm">
            Сгенерировать автоматически
          </Button>
        </div>
        <br />
        <div className="row mb-2">
          <div className="col-sm-5 col-md-5">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <label className="col-sm-1" className="text-left">
                  <strong>Список проектов</strong>
                  <hr className="normal" />
                </label>
                <ProjectListYear
                  onClickDeleteCard={this.onClickDeleteCard}
                  onClickCard={this.onClickCard}
                  projects={this.state.reports}
                />
              </div>
            </div>
            <label className="Label2">
              <button
                onClick={this.onClickNewProject}
                className="btn btn-success btn-sm"
              >
                Добавить проект
              </button>
            </label>
            <br />
            <br />
          </div>
          <div className="col-sm-7 col-md-7">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static box">
                <div className="box-content">
                  <div id="time-read">
                    <label className="col-sm-1" className="Label1">
                      <strong>Проект:</strong>
                    </label>
                    <TreeSelect
                      className="text-left"
                      disabled={this.state.status}
                      showSearch
                      style={{ width: "100%" }}
                      value={this.state.select_report.project.label}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={this.onChangeProject}
                    >
                      {this.state.projects.map((item, key) => {
                        return (
                          <TreeNode title={item.name}>
                            {item.projects.map((item, key) => {
                              return (
                                <TreeNode title={item.name} value={item.pk} />
                              );
                            })}
                          </TreeNode>
                        );
                      })}
                    </TreeSelect>
                  </div>
                  <br />
                  <div id="time-read">
                    <label className="col-sm-1" className="Label1">
                      <strong>Отчет по задачам проекта:</strong>
                    </label>
                    <textarea
                      value={this.state.select_report.note.task}
                      onChange={this.onChangeReport}
                      className="form-control"
                      maxlength="10000"
                      placeholder="Кртакий отчет по задачам проекта (что нужно было сделать/что сделано)..."
                      rows="5"
                    ></textarea>
                  </div>
                  <br />
                  <div id="time-read">
                    <label className="col-sm-1" className="Label1">
                      <strong>Сроки плановые:</strong>
                    </label>
                    <textarea
                      onChange={this.onChangePlan}
                      value={this.state.select_report.note.timing_sch}
                      className="form-control"
                      maxlength="10000"
                      placeholder="Начало (месяц.год)/окончание (месяц.год)"
                      rows="1"
                    ></textarea>
                  </div>
                  <br />
                  <div id="time-read">
                    <label className="col-sm-1" className="Label1">
                      <strong>Сроки фактические:</strong>
                    </label>
                    <textarea
                      onChange={this.onChangeFact}
                      value={this.state.select_report.note.timing_act}
                      className="form-control"
                      maxlength="10000"
                      placeholder="Начало (месяц.год)/окончание (месяц.год)"
                      rows="1"
                    ></textarea>
                  </div>
                  <br />
                  <div id="note-read">
                    <label className="col-sm-1" className="Label1">
                      <strong>Анализ причин:</strong>
                    </label>
                    <textarea
                      onChange={this.onChangeAnaliz}
                      value={this.state.select_report.note.analys}
                      className="form-control"
                      id="body_report"
                      maxlength="10000"
                      placeholder="Анализ причин срыва сроков и невыполнения задач..."
                      rows="5"
                    ></textarea>
                  </div>
                  <hr className="normal" />
                  <label className="Label2">
                    <button
                      onClick={this.onClickSaveProject}
                      className="btn btn-success"
                    >
                      Сохранить
                    </button>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyReport;
