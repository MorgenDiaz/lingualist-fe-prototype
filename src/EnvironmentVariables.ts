export class EnvironmentVariables {
  private static instance: EnvironmentVariables;
  readonly BASE_URL: string;

  constructor() {
    this.BASE_URL = process.env.REACT_APP_BASE_URL;
  }
  static getInstance = (): EnvironmentVariables => {
    if (!this.instance) {
      this.instance = new EnvironmentVariables();
    }

    return this.instance;
  };
}
