import axios from "axios";

const api = axios.create({
  baseURL:
    "http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/",
});

const makeRequest = (path: string, params = {}) =>
  axios.get(
    `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
    {
      params: {
        ...params,
      },
    }
  );

const getData = async (
  path: string,
  type: string,
  params = {},
  body?: string
) => {
  try {
    const { data } = await makeRequest(path, params);
    return data;
  } catch (e) {
    return null;
  }
};

export const getApi = {
  keyword: (search: string) => getData(`keyword_search/`, "GET", { search }),
  statistics: () => getData("channel_analyze/", "GET"),
  statisticsKeyword: (search: string, keyword: string) =>
    getData("channel_analyze/keyword_data/", "GET", {
      search,
      keyword,
    }),
  searchYoutuber: (youtuber_name: string) =>
    getData("youtuber_search/channel_list/", "GET", { youtuber_name }),
  star: (id: string) => api.get(`youtuber_search/channel_list/${id}/`),
  period: (id: string, start: string, end: string) =>
    api.get(`youtuber_search/channel_period_data/${id}/`, {
      params: {
        start: start,
        end: end,
      },
    }),
};
