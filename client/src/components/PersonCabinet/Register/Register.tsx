import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import styles from "../Projects/Projects.module.css";
import { Link } from "react-router-dom";
import { setDate } from "../../../common/date";
import { ProjectsApi } from "../../../api";
import { useHistory } from "react-router-dom";
import { tableIcons } from "../../icons";

export type Project = {
  assistant_CD: any[];
  close: boolean;
  chief_designer: string;
  contract: string;
  customer: string;
  direction: string;
  leader: string;
  military_accept: boolean;
  order_production: string;
  reported: boolean;
  type_proj: boolean;
  value: number;
};

const Register = () => {
  const token = localStorage.getItem("token");
  const date = setDate();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>();
  useEffect(() => {
    if (!token) {
      history.push("/");
      return;
    }
    const init = async () => {
      const userProjects = await ProjectsApi.getUserProjects(token);
      setProjects(userProjects);
    };
    setLoading(true);
    init().then(() => setLoading(false));
  }, []);
  const onClickNewProject = () => {
    history.push("/cabinet/admin/new_project");
  };
  const onClickBack = () => {
    history.push("/cabinet/admin/register");
  };
  const columns = [
    { title: "Направ-е", field: "direction.label" },
    { title: "Проект", field: "name" },
    { title: "Руководитель", field: "leader.label" },
    { title: "ГК", field: "chief_designer.label" },
    {
      title: "Зам ГК",
      field: "assistant_CD",
      render: (date: Project) =>
        date.assistant_CD.map((item) => item.label).join(", "),
    },
    { title: "Заказ в пр-во", field: "order_production" },
    { title: "№договора", field: "contract" },
    { title: "Заказчик", field: "customer" },
    {
      title: "Тип",
      field: "type_proj",
      render: (date: Project) => {
        return date.type_proj ? (
          <div className={styles.outside}>внеш</div>
        ) : (
          <div className={styles.inside}>внутр</div>
        );
      },
    },
    {
      title: "Сост-е",
      field: "close",
      render: (date: Project) => {
        return date.close ? (
          <div className={styles.open}>открыт</div>
        ) : (
          <div className={styles.close}>закрыт</div>
        );
      },
    },
    {
      title: "В отчет",
      field: "reported",
      render: (date: Project) => {
        return date.reported ? (
          <div className={styles.open}>доступен</div>
        ) : (
          <div className={styles.close}>не доступен </div>
        );
      },
    },
    {
      title: "Приемка ВП",
      field: "military_accept",
      render: (date: Project) => {
        return date.military_accept ? (
          <div className={styles.VP}>ВП</div>
        ) : (
          <div></div>
        );
      },
    },
    {
      title: "",
      render: (date: Project) => {
        return (
          <Link to={`/cabinet/admin/projects/edit_project/${date.value}`}>
            <div className={styles.open}>+</div>
          </Link>
        );
      },
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-left">Реестр проектов</h3>
          <div className="buttons text-left">
            <Link to={"/cabinet/admin/projects/new_project"}>
              <button type="button" className="btn btn-success btn-sm">
                Добавить новый
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ marginLeft: "5px" }}
            >
              Экспорт результатов
            </button>
          </div>
          <hr className="normal" />
          <MaterialTable
            isLoading={loading}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 25, 50, 100],
            }}
            icons={tableIcons}
            title="Список проектов"
            columns={columns}
            data={projects ? projects : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
