import React, {
  ForwardedRef,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

export interface Icons {
  Add?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Check?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Clear?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Delete?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  DetailPanel?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  Edit?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Export?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  Filter?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  FirstPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  SortArrow?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  LastPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  NextPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  PreviousPage?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  ResetSearch?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  Search?: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>;
  ThirdStateCheck?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
  ViewColumn?: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >;
}

export const tableIcons: Icons = {
  Add: forwardRef((props: any, ref: any): any => (
    <AddBox {...props} ref={ref} />
  )),
  Check: forwardRef((props: any, ref: any): any => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef((props: any, ref: any): any => (
    <Clear {...props} ref={ref} />
  )),
  Delete: forwardRef((props: any, ref: any): any => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props: any, ref: any): any => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any): any => (
    <Edit {...props} ref={ref} />
  )),
  Export: forwardRef((props: any, ref: any): any => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any): any => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any): any => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any): any => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any): any => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any): any => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any): any => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any): any => (
    <Search {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props: any, ref: any): any => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any): any => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any): any => (
    <ViewColumn {...props} ref={ref} />
  )),
};
