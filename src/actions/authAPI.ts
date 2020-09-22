import axios, {AxiosRequestConfig} from 'axios';

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

const getData = async (path: string, config: AxiosRequestConfig, type: string, body?: string) => {
  try {
    const {data} =
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
  auth: (config: AxiosRequestConfig) => getData('accounts/auth/user/', config, 'GET'),
  signIn: (config: AxiosRequestConfig, body: string) =>
    getData('accounts/auth/login/', config, 'POST', body),
  signOut: (config: AxiosRequestConfig) => getData('accounts/auth/logout/', config, 'POST', null),
  signUp: (config: AxiosRequestConfig, body: string) =>
    getData('accounts/auth/register/', config, 'POST', body),
  userInfoInit: (config: AxiosRequestConfig) =>
    getData('accounts/auth/userinfo/update/', config, 'PUT'),
};
