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

    const data = await getApi.auth(config);
    data ? dispatch(userLoaded(data)) : dispatch(removeToken());
  } else {
    console.log("no token in browser");
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

  if (data) {
    dispatch(setToken(data));
    dispatch(userLoaded(data));
  } else {
    dispatch(removeToken());
  }
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

  const data = await getApi.signOut(config);
  data === "" ? dispatch(removeToken()) : console.log("sign out error");
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

  const infoInitData = await getApi.userInfoInit(config);
  if (!infoInitData) {
    console.log("User info init API error");
  }

  const userInfoData = await getApi.getUserInfo(config);
  userInfoData ? dispatch(userLoaded(userInfoData)) : console.log("eeeeerorrr");
};
