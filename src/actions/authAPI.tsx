import axios, { AxiosRequestConfig } from "axios";

const makeRequest = (
  path: string,
  config: AxiosRequestConfig,
  type: string,
  body?: string
) =>
  type === "GET"
    ? axios.get(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        config
      )
    : axios.post(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        body,
        config
      );

const getData = async (
  path: string,
  config: AxiosRequestConfig,
  type: string,
  body?: string
) => {
  try {
    const { data } =
      body !== undefined
        ? await makeRequest(path, config, type, body)
        : await makeRequest(path, config, type);
    return data;
  } catch (e) {
    return null;
  }
};

export const getApi = {
  auth: (config: AxiosRequestConfig) =>
    getData("accounts/auth/user/", config, "GET"),
  login: (config: AxiosRequestConfig, body: string) =>
    getData("accounts/auth/login/", config, "POST", body),
};
