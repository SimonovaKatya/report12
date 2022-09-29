import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogOut from "../Header/HeaderNav";
import SendReport from "../SendReport/SendReport";
import "./Main.css";
import Switch from "react-bootstrap/cjs/Switch";
import ReportYear from "../ReportYear/EmptyReport";
import { Route, Link } from "react-router-dom";
import rend from "../../../index";
import Structure from "../Tree/Structure";
import { Space, Layout, Menu } from "antd";
import {
  UpSquareOutlined,
  UsergroupAddOutlined,
  LoginOutlined,
  FormOutlined,
  FolderOpenOutlined,
  ApartmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import CardsProject from "../CardsProject/CardsProject";
import "antd/dist/antd.css";
import EditProject from "../Register/EditProject/EditProject";
import Projects from "../Projects/Projects";
import DirectorYearReport from "../ReportYear/ReportYear";
import Register from "../Register/Register";
import TimeCard from "../TimeCard/TimeCard";
// import Calendar from "../Calendar/calendar";
import { MainPathNames } from "./MainConfig";
import UserReport from "../SendReport/Reports/UserReport/UserReport";

const { Content, Sider } = Layout;

class Main extends Component {
  state = {
    date: new Date(),
    collapsed: false,
    flag: true,
  };

  handleDateChange = (date) => this.setState({ date });

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth < 425) {
      this.setState({ collapsed: true });
    }
  }
  onClickAdmin = () => {
    if (localStorage.getItem("menu") == "false") {
      localStorage.setItem("menu", "true");
      localStorage.setItem("key", "0");
    } else {
      localStorage.setItem("menu", "false");
      localStorage.setItem("key", "7");
    }
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  logOut = () => {
    localStorage.setItem("token", null);
  };

  onChangeDate = (month, dateString) => {
    if (month !== null) {
      dateString = dateString.split("-");
      dateString = JSON.stringify({
        month: dateString[1],
        year: dateString[0],
      });
      localStorage.setItem("date", dateString);
      rend();
    }
  };
  onChangeLocation = () => {
    const pathname = document.location.pathname;
    const index = MainPathNames.findIndex((path) => path.to === pathname);
    localStorage.setItem("key", index.toString());
  };
  render() {
    const { date } = this.state;
    let now;
    if (!localStorage.getItem("date")) {
      let date = new Date();
      const month =
        date.getMonth() > 9
          ? date.getMonth() > 9 + 1
          : "0" + date.getMonth() > 9;
      const year = date.getFullYear();
      date = JSON.stringify({ year: year, month: month });
      localStorage.setItem("date", date);
      now = year + "-" + month;
    } else {
      now =
        JSON.parse(localStorage.getItem("date")).year +
        "-" +
        JSON.parse(localStorage.getItem("date")).month;
    }
    if (!localStorage.getItem("menu")) {
      localStorage.setItem("menu", "true");
    }
    return (
      <Layout style={{ minHeight: "100vh", paddingTop: 0, margin: 0 }}>
        <LogOut />
        <Layout className="site-layout">
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{ backgroundColor: "white" }}
          >
            <div
              style={{
                backgroundColor: "white",
                color: "#fff",
                marginTop: "20px",
              }}
            >
              <Space direction="vertical">
                {/*<Calendar onChange={this.handleDateChange} />*/}
              </Space>
            </div>
            {localStorage.getItem("menu") === "true" ? (
              <Menu
                defaultSelectedKeys={localStorage.getItem("key")}
                onClick={this.onClickCalendar}
                theme="light"
                mode="inline"
              >
                {MainPathNames.map(({ name, to }, index) => (
                  <Menu.Item
                    key={index}
                    icon={<UpSquareOutlined style={{ fontSize: "16px" }} />}
                  >
                    <Link to={to}>
                      <span data-feather="home"></span>
                      {name}
                      <span className="sr-only"></span>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            ) : (
              <Menu
                defaultSelectedKeys={localStorage.getItem("key")}
                mode="inline"
              >
                <Menu.Item
                  key="7"
                  icon={<UpSquareOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/list_reports">
                    <span data-feather="home"></span>
                    Список отчетов
                    <span className="sr-only"></span>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="8"
                  icon={<UpSquareOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/list_year_reports">
                    <span data-feather="home"></span>
                    Годовой отчет
                    <span className="sr-only"></span>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="9"
                  icon={<UsergroupAddOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/summary_table">
                    <span data-feather="shopping-cart"></span>
                    Сводная таблица
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="10"
                  icon={<UsergroupAddOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/cards_project">
                    <span data-feather="shopping-cart"></span>
                    Карточка по проектам
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="11"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/projects">
                    <span data-feather="layers"></span>
                    Реестр проектов
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="12"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/summary_table_filters">
                    <span data-feather="layers"></span>
                    Сводный отчет с фильтрами
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="13"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/calendar">
                    <span data-feather="layers"></span>
                    Трудовой календарь
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="14"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/salary">
                    <span data-feather="layers"></span>
                    Расчет зарплат
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="15"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/summary_constr">
                    <span data-feather="layers"></span>
                    Отчет конструкторов
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="16"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/timetable">
                    <span data-feather="layers"></span>
                    Система учета времени
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="17"
                  icon={<LoginOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/logs">
                    <span data-feather="shopping-cart"></span>
                    Смотреть логи
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="18"
                  icon={<FolderOpenOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/groups">
                    <span data-feather="layers"></span>
                    Управления группами
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="19"
                  icon={<FormOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/workers">
                    <span data-feather="layers"></span>
                    Информация о сотрудниках
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="20"
                  icon={<ApartmentOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link to="/cabinet/admin/structure">
                    <span data-feather="layers"></span>
                    Структура подразделений
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key="21"
                  icon={<ApartmentOutlined style={{ fontSize: "16px" }} />}
                >
                  <Link onClick={this.onClickAdmin} to="/cabinet/reports">
                    <span data-feather="layers"></span>
                    Личный кабинет
                  </Link>
                </Menu.Item>
              </Menu>
            )}
          </Sider>
          <Content>
            <div
              className="Data"
              style={{
                backgroundColor: "white",
                paddingTop: "20px",
                minHeight: "1900px",
              }}
            >
              <Switch>
                <Route path="/cabinet/reports">
                  <SendReport chosenDate={date} />
                </Route>
                <Route
                  path="/cabinet/year_reports"
                  exact
                  component={ReportYear}
                />
                <Route path="/cabinet/projects" exact component={Projects} />
                <Route
                  path="/cabinet/admin/list_year_reports"
                  exact
                  component={DirectorYearReport}
                />
                <Route
                  path="/cabinet/admin/structure"
                  exact
                  component={Structure}
                />
                <Route
                  path="/cabinet/admin/projects"
                  exact
                  component={Register}
                />
                <Route
                  path="/cabinet/admin/cards_project"
                  exact
                  component={CardsProject}
                />
                <Route
                  path="/cabinet/admin/projects/new_project"
                  exact
                  component={() => <EditProject title="Создание проектов" />}
                />
                <Route
                  path="/cabinet/sendhome-reports"
                  exact
                  component={() => <UserReport title="Создание проектов" />}
                />
                <Route
                  path="/cabinet/admin/projects/edit_project/:id"
                  exact
                  component={() => (
                    <EditProject title="Редактирование проекта" />
                  )}
                />
                <Route path="/cabinet/time_card" exact component={TimeCard} />
                <Route path="/cabinet/timetable" exact component={TimeCard} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
