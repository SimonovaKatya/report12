import React, { useEffect, useState } from "react";
import { Card, Checkbox, Radio, Select, Spin } from "antd";
import "./EditProject.css";
import { Link, useParams } from "react-router-dom";
import * as constants from "../../../../constants";
import { ProjectsApi } from "../../../../api";
import { useHistory } from "react-router-dom";

const EditProject = () => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState();
  const [userLeaders, setUserLeaders] = useState();
  const [chiefDesigners, setChiefDesigner] = useState();
  const [assistants, setAssistant] = useState();
  const [project, setProject] = useState({ assistant_CD: [] });

  const { id } = useParams();
  // useEffect(() => {
  //   if (!token) {
  //     history.push("/");
  //     return;
  //   }
  //   const init = async () => {
  //     const tempDirections = await ProjectsApi.getDirections(token);
  //     console.log("1");
  //     const tempUsersLeaders = await ProjectsApi.getUsersLeaders(token);
  //     console.log("2");
  //     const tempChiefDesignaer = await ProjectsApi.getChiefDesigner(token);
  //     console.log("3");
  //     const tempAssistents = await ProjectsApi.getAssistants(token);
  //     console.log("4");
  //     console.log(
  //       tempAssistents,
  //       tempUsersLeaders,
  //       tempChiefDesignaer,
  //       tempDirections
  //     );
  //     setDirections(tempDirections);
  //     setUserLeaders(tempAssistents);
  //     setChiefDesigner(tempChiefDesignaer);
  //     setAssistant(tempAssistents);
  //
  //     if (id) {
  //       const tempProject = await ProjectsApi.getEditProject(id, token);
  //       setProject(tempProject);
  //     }
  //   };
  //   setLoading(true);
  //   init().then(() => setLoading(false));
  // }, []);
  const onChangeType = (name, e) => {
    console.log(e);
    let temp_project = { ...project };
    if (name === "type") {
      temp_project.type_proj = e.target.value === 0 ? true : false;
    } else if (name === "status") {
      temp_project.close = e.target.value === 0 ? true : false;
    } else if (name === "reported") {
      temp_project.reported = e.target.value === 0 ? true : false;
    }
    setProject(temp_project);
  };
  const onClickBack = () => {
    history.push("/cabinet/admin/projects");
  };
  const onChangeText = (name, e) => {
    let temp = { ...project };
    if (name === "name") {
      temp.name = e.target.value;
    } else if (name === "contract") {
      temp.contract = e.target.value;
    } else if (name === "customer") {
      temp.customer = e.target.value;
    } else if (name === "order_production") {
      temp.order_production = e.target.value;
    } else if (name === "note") {
      temp.note = e.target.value;
    }
    setProject(temp);
  };
  const onChangeSelectDirection = (name) => {
    let tempProject = { ...project };
    tempProject.direction = name;
    setProject(tempProject);
  };
  const onChangeSelectDirector = (name) => {
    let tempProject = { ...project };
    tempProject.leader = name;
    setProject(tempProject);
  };
  const onChangeSelectSubDirector = (name) => {
    let tempProject = { ...project };
    tempProject.chief_designer = name;
    setProject(tempProject);
  };
  const onChangeSelectAssistants = (e, name) => {
    let tempProject = { ...project };
    if (tempProject.assistant_CD.length > e.length) {
      for (let i = 0; i < tempProject.assistant_CD.length; i++) {
        if (tempProject.assistant_CD[i].label !== e[i]) {
          tempProject.assistant_CD.splice(i, 1);
          break;
        }
      }
    } else {
      let temp = name.pop();
      if (e.indexOf(temp.label) === -1) {
        tempProject.assistant_CD.push({ label: temp.label, value: temp.value });
      }
    }
    setProject(tempProject);
  };
  const onChangeBox = (e) => {
    let tempProject = { ...project };
    tempProject.military_accept = e.target.checked;
    setProject(tempProject);
  };
  const saveProject = () => {
    if (id) {
      ProjectsApi.saveEditProject(project, token).then(() =>
        history.push("/cabinet/admin/projects")
      );
    } else {
      ProjectsApi.createProject(project, token).then(() =>
        history.push("/cabinet/admin/projects")
      );
    }
  };
  const getsAssistants = () => {
    return project?.assistant_CD.map((item) => {
      return item.label;
    });
  };

  return (
    <div className="container-fluid">
      <Spin spinning={loading}>
        <h5 className="text-left">Редактирование</h5>
        <br />
        <div className="row">
          <div className="col-lg-12">
            <Card>
              <div className="form">
                <div className="form-group row">
                  <label
                    htmlFor="input-name"
                    className="col-sm-2 col-form-label"
                  >
                    Название проекта
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={(e) => onChangeText("name", e)}
                      type="text"
                      className="form-control form-control-sm"
                      value={project?.name}
                      placeholder="Введите текст"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="direction"
                    className="col-sm-2 col-form-label"
                  >
                    Направления
                  </label>
                  <div className="col-sm-9">
                    <Select
                      showSearch={true}
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      name={"direction"}
                      onChange={onChangeSelectDirection}
                      options={directions}
                      value={project?.direction?.label}
                      placeholder="Выбрать"
                      style={{ width: "100%" }}
                      className="text-left"
                    />
                  </div>
                </div>
                <hr />
                <div className="form-group row">
                  <label htmlFor="director" className="col-sm-2 col-form-label">
                    Руководитель
                  </label>
                  <div className="col-sm-9">
                    <Select
                      showSearch={true}
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={onChangeSelectDirector}
                      options={userLeaders}
                      value={project?.leader?.label}
                      placeholder="Выбрать"
                      style={{ width: "100%" }}
                      className="text-left"
                      id={"director"}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="designer" className="col-sm-2 col-form-label">
                    Главный конструктор
                  </label>
                  <div className="col-sm-9">
                    <Select
                      showSearch={true}
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={onChangeSelectSubDirector}
                      options={chiefDesigners}
                      value={project?.chief_designer?.label}
                      placeholder="Выбрать"
                      style={{ width: "100%" }}
                      className="text-left"
                      id={"designer"}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="deputy" className="col-sm-2 col-form-label">
                    Зам.Гл.Конструктора
                  </label>
                  <div className="col-sm-9">
                    <Select
                      showSearch={true}
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      mode="multiple"
                      onChange={onChangeSelectAssistants}
                      options={assistants}
                      value={getsAssistants()}
                      placeholder="Выбрать"
                      style={{ width: "100%" }}
                      className="text-left"
                    />
                  </div>
                </div>
                <hr />
                <div className="form-group row">
                  <label
                    htmlFor="num_contract"
                    className="col-sm-2 col-form-label"
                  >
                    № договора
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      onChange={(e) => onChangeText("contract", e)}
                      value={project?.contract}
                      autoSize={{ minRows: 2, maxRows: 8 }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="customer" className="col-sm-2 col-form-label">
                    Заказчик
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      onChange={(e) => onChangeText("customer", e)}
                      value={project?.customer}
                      autoSize={{ minRows: 2, maxRows: 8 }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="order" className="col-sm-2 col-form-label">
                    Заказ на производство
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      onChange={(e) => onChangeText("order_production", e)}
                      value={project?.order_production}
                      autoSize={{ minRows: 2, maxRows: 8 }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="comment" className="col-sm-2 col-form-label">
                    Комментарий
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      onChange={(e) => onChangeText("note", e)}
                      value={project?.note}
                      autoSize={{ minRows: 2, maxRows: 8 }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="tip" className="col-sm-2 col-form-label">
                    Тип
                  </label>
                  <div className="col-sm-9 text-left">
                    <Radio.Group
                      onChange={(e) => onChangeType("type", e)}
                      value={project?.type_proj ? 0 : 1}
                    >
                      <Radio value={0}>
                        <label className="tip1" htmlFor="inlineCheckbox1">
                          Внутр
                        </label>
                      </Radio>
                      <Radio value={1}>
                        <label className="tip2" htmlFor="inlineCheckbox1">
                          Внеш
                        </label>
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="state" className="col-sm-2 col-form-label">
                    Состояние
                  </label>
                  <div className="col-sm-9 text-left">
                    <Radio.Group
                      onChange={(e) => onChangeType("status", e)}
                      value={project?.close ? 0 : 1}
                    >
                      <Radio value={0}>
                        <label className="open" htmlFor="inlineCheckbox1">
                          Открыт
                        </label>
                      </Radio>
                      <Radio value={1}>
                        <label className="cclose" htmlFor="inlineCheckbox1">
                          Закрыт
                        </label>
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="state" className="col-sm-2 col-form-label">
                    Доступность для отчетов сотрудников
                  </label>
                  <div className="col-sm-9 text-left">
                    <Radio.Group
                      onChange={(e) => onChangeType("reported", e)}
                      name={"reported"}
                      value={project?.reported ? 0 : 1}
                    >
                      <Radio value={0}>
                        <label className="open" htmlFor="inlineCheckbox1">
                          Доступен
                        </label>
                      </Radio>
                      <Radio value={1}>
                        <label className="cclose" htmlFor="inlineCheckbox1">
                          Недоступен
                        </label>
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="pp" className="col-sm-2 col-form-label">
                    Приемка ВП
                  </label>
                  <div className="col-sm-9 text-left">
                    <Checkbox
                      onChange={onChangeBox}
                      id={"pp"}
                      checked={project?.military_accept}
                    >
                      <label className="pp" htmlFor="inlineCheckbox1">
                        ПП
                      </label>
                    </Checkbox>
                  </div>
                </div>
                <br />
                <div className="text-center">
                  <button
                    onClick={saveProject}
                    className="btn btn-success btn-sm"
                    style={{ marginRight: "5px" }}
                  >
                    Сохранить
                  </button>
                  <Link to="/cabinet/admin/projects">
                    <button className="btn btn-secondary btn-sm">Отмена</button>{" "}
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default EditProject;
