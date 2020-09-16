import axios, {AxiosRequestConfig} from 'axios';

import {IConfigProps} from './auth';

const api = axios.create({
  baseURL: 'http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/',
});

const makeRequest = (path: string, params = {}, type: string, body?: string) =>
  type === 'GET'
    ? axios.get(`http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`, {
        params: {
          ...params,
        },
      })
    : axios.post(
        `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        body,
        {
          params: {
            ...params,
          },
        }
      );

const getData = async (path: string, params = {}, type: string, body?: string) => {
  try {
    body !== undefined ? console.log('post') : console.log('get');

    const {data} =
      body !== undefined
        ? await makeRequest(path, params, type, body)
        : await makeRequest(path, params, type);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const makeRequestAuth = (path: string, config: AxiosRequestConfig, type: string, body?: string) =>
  type === 'GET'
    ? axios.get(
        `https://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        config
      )
    : axios.post(
        `https://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
        body,
        config
      );

const getDataAuth = async (
  path: string,
  config: AxiosRequestConfig,
  type: string,
  body?: string
) => {
  try {
    body !== undefined ? console.log('post') : console.log('get');

    const {data} =
      body !== undefined
        ? await makeRequestAuth(path, config, type, body)
        : await makeRequestAuth(path, config, type);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getApi = {
  keyword: (search: string) => getData(`keyword_search/`, {search}, 'GET'),

  statistics: () => api.get('channel_analyze/'),
  statisticsKeyword: (search: string, keyword: string) =>
    api.get('channel_analyze/keyword_data/', {
      params: {
        search: search,
        keyword: keyword,
      },
    }),
  star: (id: string) => api.get(`youtuber_search/channel_list/${id}/`),
  period: (id: string, start: string, end: string) =>
    api.get(`youtuber_search/channel_period_data/${id}/`, {
      params: {
        start: start,
        end: end,
      },
    }),

  auth: (config: AxiosRequestConfig) => getDataAuth('accounts/auth/user', config, 'GET'),
  login: (config: AxiosRequestConfig, body: string) =>
    getDataAuth('accounts/auth/login', config, 'POST', body),
};
