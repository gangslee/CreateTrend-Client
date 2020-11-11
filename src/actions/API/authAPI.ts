import axios, { AxiosRequestConfig } from 'axios';

// 각 method에 따른 data request logic
const makeRequest = (path: string, config: AxiosRequestConfig, type: string, body?: string) =>
  type === 'GET'
    ? axios.get(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        config
      )
    : type === 'POST'
    ? axios.post(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        body,
        config
      )
    : axios.put(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        {},
        config
      );

// 각 method에 따른 data fetch logic
const getData = async (path: string, config: AxiosRequestConfig, type: string, body?: string) => {
  try {
    const { data } =
      body !== undefined
        ? await makeRequest(path, config, type, body)
        : await makeRequest(path, config, type);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getApi = {
  auth: (config: AxiosRequestConfig) => getData('accounts/auth/user/', config, 'GET'), // 사용자 인증 여부에 사용되는 API
  signIn: (config: AxiosRequestConfig, body: string) =>
    getData('accounts/auth/login/', config, 'POST', body), // 로그인 확인에 사용되는 API
  signOut: (config: AxiosRequestConfig) => getData('accounts/auth/logout/', config, 'POST', null), // 로그아웃 확인에 사용되는 API
  signUp: (config: AxiosRequestConfig, body: string) =>
    getData('accounts/auth/register/', config, 'POST', body), // 회원가입에 사용되는 API
  userInfoInit: (config: AxiosRequestConfig) =>
    getData('accounts/auth/userinfo/update/', config, 'PUT'), // 사용자 계정 정보 생성에 사용되는 API
  getUserInfo: (config: AxiosRequestConfig) => getData('accounts/auth/user/', config, 'GET'), // 사용자 정보 data 통신에 사용되는 API
};
