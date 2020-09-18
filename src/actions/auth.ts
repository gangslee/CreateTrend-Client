import { AxiosRequestConfig } from "axios";

import { RootState, RootDispatch } from "../store/store";
import {
  userLoading,
  removeToken,
  setToken,
  userLoaded,
} from "../store/reducers/auth";
import { getApi } from "./authAPI";

export const loadUser = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(userLoading);

  const token = state.auth.token;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const data = await getApi.auth(config);

  if (data) {
    dispatch(userLoaded(data));
  } else {
    dispatch(removeToken());
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

  data === null ? dispatch(removeToken()) : dispatch(setToken(data));
};

export const logout = async (state: RootState, dispatch: RootDispatch) => {
  const token = state.auth.token;

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  dispatch(removeToken());
};
