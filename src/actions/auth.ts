import { AxiosRequestConfig } from "axios";

import store, { RootState, RootDispatch } from "../store/store";
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

export const signIn = async (
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
  const data = await getApi.signIn(config, body);

  data === null ? dispatch(removeToken()) : dispatch(setToken(data));
};

export const signOut = async (state: RootState, dispatch: RootDispatch) => {
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

export const signUp = async (
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

  const signUpData = await getApi.signUp(config, body);
  signUpData === null
    ? dispatch(removeToken())
    : dispatch(setToken(signUpData));

  const token = store.getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  console.log(config);
  const userInfoData = await getApi.userInfoInit(config);
  userInfoData ? console.log("good") : console.log("errorrr");
};
