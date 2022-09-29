import { PATH } from "../constants";
import {
  CReport,
  CSendReports,
  ISendReportsInterface,
  Department,
} from "../components/PersonCabinet/SendReport/Reports/UserReport/UserReport";
import {
  IReportsInterface,
  CReports,
  CSelectReport,
} from "../components/PersonCabinet/SendReport/DesignerReport/DesignerReport";

import * as constants from "../constants";

class ReportsApi {
  async getListProjects(token: string): Promise<Department[] | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const req = await fetch(`${PATH}/api/reports/directions`, {
      method: "GET",
      headers: myHeaders,
    });
    if (req.ok) {
      return req.json();
    }
    return [];
  }

  async getReports(
    token: string,
    month: string,
    year: string
  ): Promise<ISendReportsInterface | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const req = await fetch(`${PATH}/api/reports?year=${year}&month=${month}`, {
      method: "GET",
      headers: myHeaders,
    });
    if (req.ok) {
      return req.json();
    }
    return new CSendReports();
  }

  async deleteCard(report: CReport, token: string) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const req = await fetch(`${constants.PATH}/api/report/${report.id}/`, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    });
    if (req.ok) {
      return req.json();
    }
  }

  async deleteConstrCard(report: CSelectReport, token: string) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const req = await fetch(`${constants.PATH}/api/reports`, {
      //${report.id}
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({ report_id: report.id }),
    });
    if (req.ok) {
      return req.json();
    }
  }

  async editReport(
    report: CReport,
    token: string
  ): Promise<CReport | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //myHeaders.append("Content-Type", "application/json");
    const date = JSON.parse(localStorage.getItem("date") || "{}");
    const urlencoded = new URLSearchParams();
    urlencoded.append("notes", report.notes);
    urlencoded.append("worktime", report.sumTime);
    urlencoded.append("project", report.project.name);
    urlencoded.append("year", date.year);
    urlencoded.append("month", date.month);
    const res = await fetch(`${constants.PATH}/api/report/${report.id}/`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async createReport(
    report: CReport,
    token: string
  ): Promise<CReport | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const date = JSON.parse(localStorage.getItem("date") || "{}");
    const urlencoded = new URLSearchParams();
    console.log(
      report.notes,
      report.sumTime,
      report.project.name,
      date.year,
      date.month
    );
    urlencoded.append("notes", report.notes);
    urlencoded.append("worktime", report.sumTime);
    urlencoded.append("project", report.project.name);
    urlencoded.append("year", date.year);
    urlencoded.append("month", date.month);
    const res = await fetch(`${constants.PATH}/api/reports/`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
  async getDesignerReports(
    token: string,
    month: string,
    year: string
  ): Promise<IReportsInterface | undefined> {
    console.log("Запрос!");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const req = await fetch(`${PATH}/api/reports?year=${year}&month=${month}`, {
      method: "GET",
      headers: myHeaders,
    });
    if (req.ok) {
      return req.json();
    }
    return new CReports();
  }

  async getDirections(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const req = await fetch(`${PATH}/api/reports/directions`, {
      method: "GET",
      headers: myHeaders,
    });
    if (req.ok) {
      return req.json();
    }
    return [];
  }
  async createConstrReport(
    report: CSelectReport,
    token: string
  ): Promise<CSelectReport | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const date = JSON.parse(localStorage.getItem("date") || "{}");
    const urlencoded = new URLSearchParams();
    console.log(
      report.notes,
      report.sumTime,
      report.project.name,
      date.year,
      date.month
    );
    urlencoded.append("notes", JSON.stringify(report.notes));
    urlencoded.append("sum_time", report.sumTime);
    urlencoded.append("project", report.project.name);
    urlencoded.append("archives", report.sumArchive);
    urlencoded.append("year", date.year);
    urlencoded.append("month", date.month);
    const res = await fetch(`${constants.PATH}/api/reports`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async editConstrReport(
    report: CSelectReport,
    token: string
  ): Promise<CSelectReport | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //myHeaders.append("Content-Type", "application/json");
    const date = JSON.parse(localStorage.getItem("date") || "{}");
    const urlencoded = new URLSearchParams();
    urlencoded.append("notes", JSON.stringify(report.notes));
    urlencoded.append("sum_time", report.sumTime);
    urlencoded.append("project", report.project.id.toString());
    urlencoded.append("archives", report.sumArchive);
    urlencoded.append("year", date.year);
    urlencoded.append("month", date.month);
    const res = await fetch(`${constants.PATH}/api/reports`, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
}

export default new ReportsApi();
