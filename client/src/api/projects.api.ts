import { PATH } from "../constants";
import { Project } from "../components/PersonCabinet/Projects/Projects";
import * as constants from "../constants";

class ProjectsApi {
  async getUserProjects(token: string): Promise<Project[] | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/projects/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async getDirections(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/directions/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async getUsersLeaders(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/users/leaders/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async getChiefDesigner(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/users/chief_designers/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async getAssistants(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/users/assistants/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async getEditProject(pk: number, token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/project/${pk}/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }

  async saveEditProject(project: any, token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const tempProject = project;
    const formdata = new URLSearchParams();
    formdata.append("direction", project.direction.value);
    formdata.append("project_name", project.name);
    formdata.append("leader", project.leader.value);
    formdata.append("chief_designer", project.chief_designer.value);
    formdata.append(
      "assistant_CD",
      project.assistant_CD
        .map((item: any) => {
          return item.value;
        })
        .join(",")
    );
    formdata.append("contract", project.contract);
    formdata.append("customer", project.customer);
    formdata.append("type_proj", project.type_proj);
    formdata.append("close", project.close);
    formdata.append("reported", project.reported);
    formdata.append("note", project.note ? project.note : "");
    formdata.append("order_production", project.order_production);
    formdata.append("military_accept", project.military_accept);
    const res = await fetch(`${constants.PATH}/api/project/${project.value}/`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
  async createProject(project: any, token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const tempProject = project;
    const formdata = new URLSearchParams();
    formdata.append("direction", project.direction.value);
    formdata.append("project_name", project.name);
    formdata.append("leader", project.leader.value);
    formdata.append("chief_designer", project.chief_designer.value);
    formdata.append(
      "assistant_CD",
      project.assistant_CD
        .map((item: any) => {
          return item.value;
        })
        .join(",")
    );
    formdata.append("contract", project.contract);
    formdata.append("customer", project.customer);
    formdata.append("type_proj", project.type_proj);
    formdata.append("close", project.close);
    formdata.append("reported", project.reported);
    formdata.append("note", project.note ? project.note : "");
    formdata.append("order_production", project.order_production);
    formdata.append("military_accept", project.military_accept);
    const res = await fetch(`${constants.PATH}/api/projects/`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
}

export default new ProjectsApi();
