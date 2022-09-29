import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import styles from "../Projects/Projects.module.css";
import { setDate } from "../../../common/date";
import { useHistory } from "react-router-dom";
import { CardProjectsApi } from "../../../api";
import { tableIcons } from "../../icons";

export type CardProject = {
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
  // name: string;
};
const CardsProjects = () => {
  const token = localStorage.getItem("token");
  const date = setDate();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<CardProject[]>();
  useEffect(() => {
    // if(!token){
    //   history.push('/');
    //   return
    // }
    const init = async () => {
      const cardsProject = await CardProjectsApi.getCardProjects(
        token ? token : ""
      );
      setCards(cardsProject);
    };
    setLoading(true);
    init().then(() => setLoading(false));
  }, []);
  const columns = [
    { title: "№ п/п", field: "num" },
    { title: "Наименование проекта", field: "label" },
    {
      title: "Тип",
      field: "type_proj",
      render: (date: CardProject) => {
        return date.type_proj ? (
          <div className={styles.outside}>внеш</div>
        ) : (
          <div className={styles.inside}>внутр</div>
        );
      },
    },
    { title: "Главный конструктор", field: "chief_designer" },
    { title: "№ договора", field: "contract" },
    { title: "Часы за период", field: "hours" },
    { title: "Доля,%", field: "part" },
  ];
  return (
    <MaterialTable
      options={{
        pageSize: 10,
        pageSizeOptions: [10, 25, 50, 100],
      }}
      isLoading={loading}
      icons={tableIcons}
      title="Список проектов"
      columns={columns}
      data={cards ? cards : []}
    />
  );
};

export default CardsProjects;
