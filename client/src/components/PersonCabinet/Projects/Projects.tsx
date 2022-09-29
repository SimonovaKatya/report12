import React, {
  ForwardedRef,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import MaterialTable from "material-table";
import styles from "./Projects.module.css";
import { setDate } from "../../../common/date";
import { useHistory } from "react-router-dom";
import { ProjectsApi } from "../../../api";
import { tableIcons } from "../../icons";

export type Project = {
  assistant_CD: string[];
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

const Projects = () => {
  const token = localStorage.getItem("token");
  const date = setDate();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>();
  // useEffect(() => {
  //
  //   if (!token) {
  //     history.push("/");
  //     return;
  //   }
  //   const init = async () => {
  //     const userProjects = await ProjectsApi.getUserProjects(token);
  //     setProjects(userProjects);
  //   };
  //   setLoading(true);
  //   init().then(() => setLoading(false));
  // }, []);

  const columns = [
    { title: "Направ-е", field: "direction" },
    { title: "Проект", field: "name" },
    { title: "Руководитель", field: "leader" },
    { title: "ГК", field: "chief_designer" },
    {
      title: "Зам ГК",
      field: "assistant_CD",
      render: (date: Project) => date.assistant_CD.join(", "),
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
  ];

  return (
    <MaterialTable
      options={{
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
      }}
      icons={tableIcons}
      isLoading={loading}
      title="Список проектов"
      columns={columns}
      data={projects ? projects : []}
    />
  );
};

export default Projects;

//список всех проектов
