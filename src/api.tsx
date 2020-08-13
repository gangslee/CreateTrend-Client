import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.124.107.195:8000/',
});

export const getApi = {
  keyword: (search: string) =>
    api.get('keyword_search/', {
      params: {
        search: search,
      },
    }),
};
