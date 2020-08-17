import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com:8000/',
});

export const getApi = {
  keyword: (search: string) =>
    api.get('keyword_search/', {
      params: {
        search: search,
      },
    }),
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
};
