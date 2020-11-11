import { createSlice } from "@reduxjs/toolkit";
import { ILineChartData } from "../types";

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
    keyword: string;
    include: string;
    exclude: string;
  };
  keywordList: {
    keyword: string[];
    include: string[];
    exclude: string[];
  };
  keywordResult: {
    current: number;
    data: {
      idx: number;
      channel_thumbnail_url: string;
      video_thumbnail_url: string;
      video_name: string;
      channel_name: string;
    }[];
  };
  lines: ILineChartData[];
  title: string;
  date: string;
  isAdvance: boolean;
  isLoading: boolean;
} // 조회수 예측 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  thumbnail: null,
  text: {
    title: null,
    subscriber: null,
    date: null,
    keyword: null,
    include: null,
    exclude: null,
  },
  keywordList: {
    keyword: [],
    include: [],
    exclude: [],
  },
  keywordResult: {
    current: null,
    data: [],
  },
  lines: null,
  title: null,
  date: null,
  isAdvance: false,
  isLoading: false,
}; // 조회수 예측 페이지의 초기 state 선언

export const predictSlice = createSlice({
  name: "predictReducer",
  initialState,
  reducers: {
    setThumbnail: (state, action) => {
      state.thumbnail = action.payload.thumbnail;
    }, // 조회수 예측에 사용될 썸네일을 페이지에서 선택 된 썸네일로 변경

    setTextData: (state, action) => {
      state.text = action.payload;
    }, // 조회수 예측에 사용될 제목, 구독자 수, 업로드 날짜와 같은 text data를 페이지에서 선택 된 data로 변경

    setResult: (state, action) => {
      state.lines = [action.payload.lines];
      state.title = state.text.title;
      state.date = state.text.date;
      state.isLoading = false;
    }, // API를 통해 서버로부터 조회수 예측 결과를 받은 경우 전달 받은 data를 차트 형태로 화면에 출력시키고 페이지의 로딩 상태를 해제

    pushKeyword: (state, action) => {
      if (
        action.payload === "keyword-form" &&
        state.text.keyword &&
        !state.keywordList.keyword.includes(state.text.keyword)
      ) {
        state.keywordList.keyword.push(state.text.keyword);
        state.text.keyword = null;
      } else if (
        action.payload === "include-form" &&
        state.text.include &&
        !state.keywordList.include.includes(state.text.include)
      ) {
        state.keywordList.include.push(state.text.include);
        state.text.include = null;
      } else if (
        action.payload === "exclude-form" &&
        state.text.exclude &&
        !state.keywordList.exclude.includes(state.text.exclude)
      ) {
        state.keywordList.exclude.push(state.text.exclude);
        state.text.exclude = null;
      }
    }, // 페이지 내 키워드 입력 창에 키워드 제출이 됬을 경우 '검색하고 싶은 키워드', '반드시 포함하는 키워드', '제외하고 싶은 키워드' 각각의 키워드 array에 키워드를 push

    filterKeyword: (state, action) => {
      console.log(action.payload);
      if (action.payload.className === "keyword-remove") {
        state.keywordList.keyword = state.keywordList.keyword.filter(
          (word) => word !== action.payload.keyword
        );
        console.log(state.keywordList.keyword.length);
      } else if (action.payload.className === "include-remove") {
        state.keywordList.include = state.keywordList.include.filter(
          (word) => word !== action.payload.keyword
        );
      } else if (action.payload.className === "exclude-remove") {
        state.keywordList.exclude = state.keywordList.exclude.filter(
          (word) => word !== action.payload.keyword
        );
      }
    }, // 페이지 내에서 키워드 삭제가 요청 될 경우 filter 함수를 통해 array에서 삭제

    setKeywordResult: (state, action) => {
      state.keywordResult.data = action.payload;
    }, // API를 통해 서버로부터 키워드 검색 결과를 받으면 해당 data들을 state에 전달

    setKeywordResultCurrent: (state, action) => {
      state.keywordResult.current = action.payload;
    }, // 키워드 검색 결과로 화면에 출력 된 샘플 썸네일, 제목을 사용자가 선택할 시 현재 선택된 data의 index를 변경

    setAdvance: (state) => {
      state.isAdvance = !state.isAdvance;
    }, // 페이지 내에서 고급 검색 기능 활성화/비활성화 상태로 변경

    setLoading: (state) => {
      state.isLoading = true;
    }, // 페이지의 로딩 상태를 로딩 중으로 변경
  },
}); // 조회수 예측 페이지에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const {
  setThumbnail,
  setTextData,
  setResult,
  pushKeyword,
  filterKeyword,
  setKeywordResult,
  setKeywordResultCurrent,
  setAdvance,
  setLoading,
} = predictSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
