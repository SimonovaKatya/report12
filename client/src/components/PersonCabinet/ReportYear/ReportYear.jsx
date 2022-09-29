import React from "react";
import DirectorReport from "./DirectorReport/DirectorReport";
import { Modal } from "antd";
import EditReport from "./DirectorReport/EditReport";
import EditDirector from "./DirectorReport/EditDirector";
import * as constants from "../../../constants";

class ReportYear extends React.Component {
  state = {
    loading: false,
    block: "",
    perconId: "",
    reports: [],
    personReport: [],
    departments: [],
    selectDepartment: { label: "" },
    subdepartments: [],
    selectSubdepartment: { label: "" },
    modal1: false,
    modal2: false,
  };
  componentDidMount = () => {
    this.loadDate();
  };
  loadDepartments = () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${constants.PATH}departments/`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ departments: result });
      });
  };

  loadDate = () => {
    let selects = localStorage.getItem("yearReport");
    if (selects === null) {
      const temp = {
        department: { label: "", value: "" },
        subdepartment: { label: "", value: "" },
      };
      localStorage.setItem("yearReport", JSON.stringify(temp));
    } else {
      selects = JSON.parse(selects);
      if (selects.subdepartment.value) {
        this.setState({ loading: true });
        this.onChangeSubdepartment(
          selects.subdepartment.value,
          selects.subdepartment
        );
        this.loadSubdepartment(selects.department.value);
        this.setState({ selectDepartment: selects.department });
      } else if (selects.department.value) {
        this.onChangeDepartment(selects.department.value, selects.department);
      }
      this.setState({ loading: false });
    }
    this.loadDepartments();
  };

  loadSubdepartment = (id) => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${constants.PATH}department/${id}/structure/`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ subdepartments: result });
      });
  };

  onChangeDepartment = (value, full) => {
    this.setState({
      selectDepartment: full,
      selectSubdepartment: { label: "", value: "" },
    });
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    this.loadSubdepartment(value);
    const url = `${constants.PATH}structure/${value}/subdepartments/years_reports/?year=${date.year}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const temp = JSON.parse(localStorage.getItem("yearReport"));
        temp.department = full;
        temp.subdepartment = { label: "", value: "" };
        localStorage.setItem("yearReport", JSON.stringify(temp));
        let a = [...result.users];
        const subdepartments = [];
        if (result.subdepartments) {
          for (const i of result.subdepartments) {
            a.push({ label: i.label, value: i.value });
            a = a.concat(i.users);
          }
        }
        this.setState({ reports: a });
      });
  };

  onChangeSubdepartment = (value, full) => {
    this.setState({ selectSubdepartment: full });
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${constants.PATH}structure/${value}/subdepartments/years_reports/?year=${date.year}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const temp = JSON.parse(localStorage.getItem("yearReport"));
        temp.subdepartment = full;
        localStorage.setItem("yearReport", JSON.stringify(temp));
        let a = [...result.users];
        if (result.subdepartments) {
          for (const i of result.subdepartments) {
            a.push({ label: i.label, value: i.value });
            a = a.concat(i.users);
          }
        }
        this.setState({ reports: a });
      });
  };

  onClickLock = (action) => {
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const formdata = new FormData();
    formdata.append("year", date.year);
    formdata.append("action", action);
    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };
    let value;
    if (this.state.selectSubdepartment.value) {
      value = this.state.selectSubdepartment.value;
    } else if (this.state.selectDepartment.value) {
      value = this.state.selectDepartment.value;
    } else {
      return;
    }
    const url = `${constants.PATH}structure/${value}/subdepartments/years_reports/`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let a = [...result.users];
        if (result.subdepartments) {
          for (const i of result.subdepartments) {
            a.push({ label: i.label, value: i.value });
            a = a.concat(i.users);
          }
        }
        this.setState({ reports: a });
      });
  };

  showModalVisible = (id, flag, number, index) => {
    if (!flag) {
      return;
    }
    if (number === "1") {
      const token = localStorage.getItem("token");
      const date = JSON.parse(localStorage.getItem("date"));
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const url = `${constants.PATH}person/${id}/reports/years/?year=${date.year}`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            personReport: result.reports,
            block: result.status,
            perconId: id,
            personIndex: index,
          });
        });
      this.setState({
        modal1: true,
      });
    } else {
      this.setState({
        modal2: true,
      });
    }
  };

  handleCancel = (number) => {
    if (number === "1") {
      this.setState({
        modal1: false,
      });
    } else {
      this.setState({
        modal2: false,
      });
    }
  };

  onClickBlock = (id, action) => {
    const token = localStorage.getItem("token");
    const date = JSON.parse(localStorage.getItem("date"));
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const formdata = new FormData();
    formdata.append("year", date.year);
    formdata.append("action", action);
    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
      redirect: "follow",
    };
    const url = `${constants.PATH}person/${id}/reports/years/`;
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        const temp = [...this.state.reports];
        temp[this.state.personIndex].checked = result.reports[0].censor;
        this.setState({ block: result.status, reports: temp });
      });
  };
  render() {
    return (
      <div>
        <DirectorReport
          showModalVisible={this.showModalVisible}
          onClickLock={this.onClickLock}
          onChangeSubdepartment={this.onChangeSubdepartment}
          onChangeDepartment={this.onChangeDepartment}
          data={this.state}
        />
        <Modal
          title={this.state.name}
          visible={this.state.modal1}
          onCancel={this.handleCancel.bind(this, "1")}
          width={800}
          footer={[<div></div>]}
        >
          <EditReport
            block={this.state.block}
            personReport={this.state.personReport}
            onClickBlock={this.onClickBlock}
            perconId={this.state.perconId}
          />
        </Modal>
        <Modal
          title="Сводный годовой отчет"
          visible={this.state.modal2}
          onCancel={this.handleCancel.bind(this, "2")}
          width={800}
          style={{ top: 20 }}
        >
          footer={[<div></div>]}
          <EditDirector />
        </Modal>
      </div>
    );
  }
}

export default ReportYear;
