import axios, { AxiosInstance } from "axios";
import { EnvironmentVariables } from "../EnvironmentVariables";

export default class LinguaListAxiosInstance {
  static create(): AxiosInstance {
    const environmentVariables = EnvironmentVariables.getInstance();

    const instance: AxiosInstance = axios.create({
      baseURL: environmentVariables.BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return instance;
  }
}
