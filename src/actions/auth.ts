import { RootState, RootDispatch } from "../store/store";
import { userLoading, authError, loginSuccess } from "../store/reducers/auth";
import { getApi } from "./authAPI";
import { AxiosRequestConfig } from "axios";

export interface IConfigProps {
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
}

export const loadUser = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(userLoading);

  const token = state.auth.token;

  const config: AxiosRequestConfig = {};
  config.headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  const data = await getApi.auth(config);
  if (!data) {
    console.log("auth error");
  }
};

export const login = async (
  username: string,
  password: string,
  dispatch: RootDispatch
) => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });
  const data = await getApi.login(config, body);

  data === null ? dispatch(authError()) : dispatch(loginSuccess(data));
};
