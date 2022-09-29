import { PATH } from "../constants";

class PersonDataApi {
  async getReportStatus(token: string): Promise<{ status: boolean }> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/account/is_constructor`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
    return { status: false };
  }

  async getPersonCard(token: string): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/account/card`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
}

export default new PersonDataApi();
