import { PATH } from "../constants";

import publicIp from "public-ip";

type Token = {
  access: string;
  refresh: string;
};

class AuthApi {
  async auth(login: string, password: string): Promise<boolean> {
    const publicIp = require("public-ip");
    let ip = "";
    try {
      ip = String(await publicIp.v4());
    } catch (e) {
      ip = "";
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams(); // Добавляем параметры запросы
    urlencoded.append("username", login);
    urlencoded.append("password", password);
    urlencoded.append("IP", ip);
    const response = await fetch(`${PATH}/api/account/sign_in`, {
      method: "POST",
      body: urlencoded,
      headers: myHeaders,
    });
    if (response.ok) {
      const token: Token = await response.json();
      if (token.access) {
        localStorage.setItem("token", token.access);
        localStorage.setItem("key", "0");
        localStorage.setItem("menu", "true");
        const time = new Date();
        const date = JSON.stringify({
          month: time.getMonth() + 1,
          year: time.getFullYear(),
        });
        localStorage.setItem("date", date);
        return true;
      }
    }
    return false;
  }
}

export default new AuthApi();
