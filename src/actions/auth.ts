import { AxiosRequestConfig } from 'axios';

import store, { RootState, RootDispatch } from '../store/store';
import {
  userLoading,
  removeToken,
  setToken,
  userLoaded,
  setUserInfo,
} from '../store/reducers/auth';
import { getApi } from './API/authAPI';

export const loadUser = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(userLoading);

  const token = state.auth.token;

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;

    const data = await getApi.auth(config);
    data ? dispatch(userLoaded(data)) : dispatch(removeToken());
    console.log('token is in browser');
  } else {
    console.log('no token in browser');
  }
}; // 앱 최초 실행 시 브라우저의 localstorage에 auth token 존재 여부 확인

export const signIn = async (username: string, password: string, dispatch: RootDispatch) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });
  const data = await getApi.signIn(config, body);

  if (data) {
    dispatch(setToken(data));
    dispatch(setUserInfo(data));
  } else {
    dispatch(removeToken());
  }
}; // 로그인 시 token을 바탕으로 서버로부터 사용자 인증 정보를 전달 받음

export const signOut = async (state: RootState, dispatch: RootDispatch) => {
  const token = state.auth.token;

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  const data = await getApi.signOut(config);
  data === '' ? dispatch(removeToken()) : console.log('sign out error');
}; // 로그아웃 시 브라우저의 localstorage에 token을 제거

export const signUp = async (username: string, password: string, dispatch: RootDispatch) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });

  const signUpData = await getApi.signUp(config, body);

  signUpData === null ? dispatch(removeToken()) : dispatch(setToken(signUpData));

  const token = store.getState().auth.token;

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  const infoInitData = await getApi.userInfoInit(config);
  if (!infoInitData) {
    console.log('User info init API error');
  }

  const userInfoData = await getApi.getUserInfo(config);
  userInfoData ? dispatch(userLoaded(userInfoData)) : console.log('getUserInfo API error');
}; // 회원가입 시 token을 바탕으로 서버로부터 사용자 인증 정보를 전달 받고 서버에 최초 계정 정보 생성
