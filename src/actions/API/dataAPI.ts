import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// 각 method에 따른 data request logic
const makeRequestGet = (path: string, params = {}) =>
  axios.get(`http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`, {
    params: {
      ...params,
    },
  });

const makeRequestPost = (path: string, body?: string) =>
  axios.post(
    `http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com/api/${path}`,
    body,
    config
  );

// 각 method에 따른 data fetch logic
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
  keyword: (search: string) => getData(`keyword_search/`, { search }), // 키워드(콘텐츠) data 통신에 사용되는 API
  statistics: () => getData('channel_analyze/'), // 인기/영상화 차트 data 통신에 사용되는 API
  statisticsKeyword: (search: string, keyword: string) =>
    getData('channel_analyze/keyword_data/', {
      search,
      keyword,
    }), // 인기/영상화 차트 내 키워드 분석 data 통신에 사용되는 API
  searchYoutuber: (youtuber_name: string) =>
    getData('youtuber_search/channel_list/', { youtuber_name }), // 스타채널 검색 결과 data 통신에 사용되는 API
  star: (id: string) => getData(`youtuber_search/channel_list/${id}/`), // 스타채널 상세 분석  data 통신에 사용되는 API
  period: (id: string, start: string, end: string) =>
    getData(`youtuber_search/channel_period_data/${id}/`, {
      start,
      end,
    }), // 스타채널 상세 분석의 기간 내 data 통신에 사용되는 API
  predict: (
    thumbnail_url: string,
    video_name: string,
    channel_subscriber: string,
    upload_date: string
  ) =>
    postData(
      'views_predict/',
      JSON.stringify({
        thumbnail_url,
        video_name,
        channel_subscriber,
        upload_date,
      })
    ), // 조회수 예측하기 기능의 data 통신에 사용되는 API
  predictKeyword: (keyword_string: string) =>
    getData('views_predict/simple_recommendation', { keyword_string }), // 키워드 검색 기능의 data 통신에 사용되는 API
  predictKeywordAdvance: (keyword_string: string, must_keyword: string, must_not_keyword: string) =>
    getData('views_predict/advanced_recommendation', {
      keyword_string,
      must_keyword,
      must_not_keyword,
    }), // 키워드 검색(고급 검색) 기능의 data 통신에 사용되는 API
  videoDetail: (idx: string) => getData(`video_detail/${idx}/`), // 영상 상세 분석 data 통신에 사용되는 API
};
