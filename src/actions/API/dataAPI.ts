import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const makeRequestGet = (path: string, params = {}) =>
  axios.get(
    `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
    {
      params: {
        ...params,
      },
    }
  );

const makeRequestPost = (path: string, body?: string) =>
  axios.post(
    `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
    body,
    config
  );

const getData = async (path: string, params = {}) => {
  try {
    const { data } = await makeRequestGet(path, params);
    return data;
  } catch (e) {
    return null;
  }
};

const postData = async (path: string, body: string) => {
  try {
    const { data } = await makeRequestPost(path, body);
    return data;
  } catch (e) {
    return null;
  }
};

export const getApi = {
  keyword: (search: string) => getData(`keyword_search/`, { search }),
  statistics: () => getData("channel_analyze/"),
  statisticsKeyword: (search: string, keyword: string) =>
    getData("channel_analyze/keyword_data/", {
      search,
      keyword,
    }),
  searchYoutuber: (youtuber_name: string) =>
    getData("youtuber_search/channel_list/", { youtuber_name }),
  star: (id: string) => getData(`youtuber_search/channel_list/${id}/`),
  period: (id: string, start: string, end: string) =>
    getData(`youtuber_search/channel_period_data/${id}/`, {
      start,
      end,
    }),
  predict: (
    thumbnail_url: string,
    video_name: string,
    channel_subscriber: string,
    upload_date: string
  ) =>
    postData(
      "views_predict/",
      JSON.stringify({
        thumbnail_url,
        video_name,
        channel_subscriber,
        upload_date,
      })
    ),
  predictKeyword: (keyword_string: string) =>
    getData("views_predict/simple_recommendation", { keyword_string }),
  videoDetail: (idx: string) => getData(`video_detail/${idx}/`),
};
