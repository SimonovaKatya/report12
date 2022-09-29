import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Main from "./components/PersonCabinet/MainPage/Main";
import { NavLink } from "react-router-dom";
import UserReport from "./components/PersonCabinet/SendReport/Reports/UserReport/UserReport";
import DesignerReport from "./components/PersonCabinet/SendReport/Reports/DesignerReport/DesignerReport";
import {Paths} from "./components/Routing/Paths";
import {DesignerReport2} from "./components/PersonCabinet/SendReport/Reports/DesignerReport2/DesignerReport2";
import Projects from "./components/PersonCabinet/Projects/Projects";
import EditProject from "./components/PersonCabinet/Register/EditProject/EditProject";
import Auth from "./components/Auth/Auth";

const App = () => (
  <div className="App">
    <NavLink style={{ marginLeft: 20 }} to={"/send-home-reports"}>
      отчет о проделанной работе
    </NavLink>
    <NavLink style={{ marginLeft: 20 }} to={"/designer-reports"}>
      Конструкторы
    </NavLink>
    <NavLink style={{ marginLeft: 20 }} to={"/"}>
      главная
    </NavLink>
      <NavLink style={{ marginLeft: 20 }} to={Paths.DesignerReports2}>
          "Конструкторы 2"
      </NavLink>
    <NavLink style={{ marginLeft: 20 }} to={Paths.Projects}>
         проекты
      </NavLink>
    <NavLink style={{ marginLeft: 20 }} to={Paths.EditProject}>редактировать проект
    </NavLink>
    <Switch>
      <Route path={Paths.Main} exact component={Auth} />
      <Route path={Paths.Cabinet} component={Main} />
      <Route path={Paths.SendHomeReports} component={UserReport} />
      <Route path={Paths.DesignerReports} component={DesignerReport} />
      <Route path={Paths.Projects} component={Projects} />
      <Route path={Paths.EditProject} component={EditProject} />
      <Route path={Paths.DesignerReports2}>
          <div style={{padding:'1rem'}}>
              <DesignerReport2/>
          </div>
      </Route>
    </Switch>
  </div>
);
export default App;
