import { Route } from "react-router-dom";
import Auth from "../Auth/Auth";
import Main from "../PersonCabinet/MainPage/Main";
import UserReport from "../PersonCabinet/SendReport/Reports/UserReport/UserReport";
import DesignerReport from "../PersonCabinet/SendReport/Reports/DesignerReport/DesignerReport";
import React from "react";

export enum Paths {
  Main = "/",
  Cabinet = "/cabinet/",
  SendHomeReports = "/send-home-reports",
  DesignerReports = "/designer-reports",
  DesignerReports2 = "/designer-reports2",
  Projects = "/projects",
  EditProject = "/Edit-project"
}