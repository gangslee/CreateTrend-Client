import {configureStore, createSlice, combineReducers} from '@reduxjs/toolkit';

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
    color?: string;
  }[];
  color?: string;
}

export interface ILineChartData {
  type: string;
  data: {
    date: string;
    value: number;
  }[];
}

export interface IPieChartData {
  country: string;
  litres: number;
}

export interface IKeywordChartData {
  keyword: {
    name: string;
    value: number;
    popular?: number;
    wordmap?: IWordMapData;
    line?: ILineChartData[];
    video?: IVideoListData[];
    visit?: boolean;
  }[];
  type?: string;
  current?: number;
}

export interface IVideoListData {
  type: string;
  data: {
    video_id: string;
    video_name: string;
    thumbnail_url: string;
    videokeywordnew?: {
      keyword: string;
    }[];
  }[];
  current?: number;
}

interface IHomeData {
  searchTerm: string;
  searchType: number;
}

const homeData: IHomeData = {
  searchTerm: '',
  searchType: 0,
};

const homeSlice = createSlice({
  name: 'HomeReducer',
  initialState: homeData,
  reducers: {
    searchTermUpdate: (state, action) => {
      state.searchTerm = action.payload;
    },
    searchTypeUpdate: (state) => {
      state.searchType === 0 ? (state.searchType = 1) : (state.searchType = 0);
    },
  },
});

export interface IKeywordData {
  wordmap: IWordMapData;
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
  currentChart: number;
}

const keywordData: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
  currentChart: 0,
};

const keywordSlice = createSlice({
  name: 'keywordReducer',
  initialState: keywordData,
  reducers: {
    keywordDataUpdate: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.currentChart = 0;
    },
    setRadioState: (state) => {
      state.currentChart === 0 ? (state.currentChart = 1) : (state.currentChart = 0);
    },
    callLoader: (state) => {
      state.keyword = null;
      state.lines = null;
      state.video = null;
      state.wordmap = null;
      state.currentChart = 0;
    },
  },
});

interface IStatisticsState {
  keywordChart: IKeywordChartData[];
  currentChart?: number;
  currentKeyword?: number;
  isChecked?: boolean;
}

const statisticsState: IStatisticsState = {
  keywordChart: null,
  currentChart: 0,
  currentKeyword: 0,
  isChecked: false,
};

const statisticsSlice = createSlice({
  name: 'statisticsReducer',
  initialState: statisticsState,
  reducers: {
    statisticsDataUpdate: (state, action) => {
      if (action.payload) {
        state.keywordChart = action.payload;
        state.keywordChart.map((data) => data.keyword.map((word) => (word.visit = false)));
        state.isChecked = true;
      }
    },
    keywordDetailUpdate: (state, action) => {
      if (action.payload) {
        state.keywordChart[state.currentChart].keyword[state.currentKeyword].visit = true;
        state.keywordChart[state.currentChart].keyword[state.currentKeyword].popular = Math.round(
          action.payload.keyword[0].popular
        );
        state.keywordChart[state.currentChart].keyword[state.currentKeyword].wordmap =
          action.payload.keyword[0].wordmap;
        state.keywordChart[state.currentChart].keyword[state.currentKeyword].line = [
          action.payload.keyword[0].lines,
        ];
        state.keywordChart[state.currentChart].keyword[state.currentKeyword].video = [
          action.payload.keyword[0].video,
        ];
      }
    },
    disableUseAbleStatistics: (state) => {
      state.isChecked = false;
    },
    chartStateUpdate: (state) => {
      state.currentChart === 0 ? (state.currentChart = 1) : (state.currentChart = 0);
      state.currentKeyword = 0;
    },
    keywordStateUpdate: (state, action) => {
      state.currentKeyword = action.payload;
    },
  },
});

export interface IStarState {
  channelInfo?: {
    idx: number;
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    channel_start_date: string;
    subscriber: number;
  };
  keyword: {
    pie: {
      name: string;
      value: number;
      wordmap: IWordMapData;
    }[];
    current: 0;
  };
  line?: ILineChartData[];
  video: IVideoListData[];
  useAble?: boolean;
  start?: string;
  end?: string;
}

const starState: IStarState = {
  channelInfo: null,
  keyword: null,
  line: null,
  video: null,
  useAble: false,
};

const starSlice = createSlice({
  name: 'starReducer',
  initialState: starState,
  reducers: {
    starDataUpdate: (state, action) => {
      state.channelInfo = action.payload.channelInfo;
      state.keyword = action.payload.keyword;
      state.line = [action.payload.line];
      state.video = [action.payload.video];
      state.useAble = true;
    },
    starPieSliceStateUpdate: (state, action) => {
      if (state.keyword.current !== action.payload) {
        state.keyword.current = action.payload;
      }
    },
  },
});

const periodState: IStarState = {
  keyword: null,
  video: null,
  useAble: false,
  start: null,
  end: null,
};

const periodSlice = createSlice({
  name: 'periodReducer',
  initialState: periodState,
  reducers: {
    periodDataUpdate: (state, action) => {
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.useAble = true;
    },
    periodDateUpdate: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
});

const sliderSlice = createSlice({
  name: 'sliderReducer',
  initialState: {
    keyword: 0,
    statistics: 0,
    star: 0,
  },
  reducers: {
    sliderStateNext: (state, action) => {
      if (action.payload.page === 'keyword') {
        state.keyword !== action.payload.len ? (state.keyword += 1) : (state.keyword = 0);
      } else if (action.payload.page === 'statistics') {
        state.statistics !== action.payload.len ? (state.statistics += 1) : (state.statistics = 0);
      } else if (action.payload.page === 'star') {
        state.star !== action.payload.len ? (state.star += 1) : (state.star = 0);
      }
    },
    sliderStatePrev: (state, action) => {
      if (action.payload.page === 'keyword') {
        state.keyword !== 0 ? (state.keyword -= 1) : (state.keyword = action.payload.len);
      } else if (action.payload.page === 'statistics') {
        state.statistics !== 0 ? (state.statistics -= 1) : (state.statistics = action.payload.len);
      } else if (action.payload.page === 'star') {
        state.star !== 0 ? (state.star -= 1) : (state.star = action.payload.len);
      }
    },
  },
});

const pageSlice = createSlice({
  name: 'pageReducer',
  initialState: 'home',
  reducers: {
    currentPage: (state, action) => (state = action.payload),
  },
});

const headerSlice = createSlice({
  name: 'headerReducer',
  initialState: {
    isOpenSignIn: false,
    isOpenSignUp: false,
    isOpenUserMenu: false,
    isLogIn: false,
    isMembership: true,
  },
  reducers: {
    setIsOpenSignIn: (state, action) => {
      state.isOpenSignIn = action.payload;
      state.isOpenSignUp = false;
    },
    setIsOpenSignUp: (state, action) => {
      state.isOpenSignUp = action.payload;
      state.isOpenSignIn = false;
    },
    setIsLogIn: (state, action) => {
      state.isLogIn = action.payload;
    },
    setIsOpenUserMenu: (state, action) => {
      state.isOpenUserMenu = action.payload;
    },
  },
});

const cReducer = combineReducers({
  home: homeSlice.reducer,
  keyword: keywordSlice.reducer,
  statistics: statisticsSlice.reducer,
  star: starSlice.reducer,
  period: periodSlice.reducer,
  slider: sliderSlice.reducer,
  page: pageSlice.reducer,
  header: headerSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {searchTermUpdate, searchTypeUpdate} = homeSlice.actions;

export const {keywordDataUpdate, setRadioState, callLoader} = keywordSlice.actions;

export const {
  statisticsDataUpdate,
  keywordDetailUpdate,
  disableUseAbleStatistics,
  chartStateUpdate,
  keywordStateUpdate,
} = statisticsSlice.actions;

export const {starDataUpdate, starPieSliceStateUpdate} = starSlice.actions;

export const {periodDataUpdate, periodDateUpdate} = periodSlice.actions;

export const {sliderStateNext, sliderStatePrev} = sliderSlice.actions;

export const {currentPage} = pageSlice.actions;

export const {
  setIsOpenSignIn,
  setIsOpenSignUp,
  setIsLogIn,
  setIsOpenUserMenu,
} = headerSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
