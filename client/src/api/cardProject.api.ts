import { PATH } from "../constants";
import { CardProject } from "../components/PersonCabinet/CardsProject/CardsProject";

class CardProjectsApi {
  async getCardProjects(token: string): Promise<CardProject[] | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const res = await fetch(`${PATH}/api/projects/cards`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    if (res.ok) {
      return res.json();
    }
  }
}

export default new CardProjectsApi();
