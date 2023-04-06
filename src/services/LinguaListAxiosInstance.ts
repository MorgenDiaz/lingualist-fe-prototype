import axios, { AxiosInstance } from "axios";

export default class LinguaListAxiosInstance {
  static create(): AxiosInstance {
    const instance: AxiosInstance = axios.create({
      baseURL: "https://lingua-list.onrender.com",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return instance;
  }
}
