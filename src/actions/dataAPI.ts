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
  params = {},
  type: string,
  body?: string
) => {
  try {
    body !== undefined ? console.log("post") : console.log("get");

    const { data } = await makeRequest(path, params);

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getApi = {
  keyword: (search: string) => getData(`keyword_search/`, { search }, "GET"),

  statistics: () => api.get("channel_analyze/"),
  statisticsKeyword: (search: string, keyword: string) =>
    api.get("channel_analyze/keyword_data/", {
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
