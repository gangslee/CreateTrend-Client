import {configureStore, createSlice, combineReducers} from '@reduxjs/toolkit';

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
  }[];
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
    wordmap?: IWordMapData[];
    line?: ILineChartData[];
    video?: IVideoListData[];
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

export interface IKeywordData {
  wordmap: IWordMapData[];
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
  useAble?: boolean;
}

const keywordData: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
  useAble: false,
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
      state.useAble = true;
    },
  },
});

interface IStatisticsState {
  keywordChart: IKeywordChartData[];
  currentChart?: number;
  useAble?: boolean;
}

const statisticsState: IStatisticsState = {
  keywordChart: null,
  currentChart: 0,
  useAble: false,
};

const statisticsSlice = createSlice({
  name: 'statisticsReducer',
  initialState: statisticsState,
  reducers: {
    statisticsDataUpdate: (state, action) => {
      if (action.payload) {
        state.keywordChart = action.payload;
        state.useAble = true;
      }
    },
    chartStateUpdate: (state) => {
      state.currentChart === 0 ? (state.currentChart = 1) : (state.currentChart = 0);
    },
    keywordStateUpdate: (state, action) => {
      state.keywordChart[state.currentChart].current = action.payload;
    },
  },
});

export interface IStarState {
  channelInfo?: {
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
      wordmap: IWordMapData[];
    }[];
    current: 0;
  };
  line?: ILineChartData[];
  video: IVideoListData[];
  useAble?: boolean;
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
      state.line = action.payload.line;
      state.video = action.payload.video;
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
};

const sliderSlice = createSlice({
  name: 'sliderReducer',
  initialState: {
    keyword: 0,
    statistics: 0,
    star: 0,
  },
  reducers: {
    sliderStateNext: (state, action) => {
      if (action.payload === 'keyword') {
        state.keyword !== 9 ? (state.keyword += 1) : (state.keyword = 0);
      } else if (action.payload === 'statistics') {
        state.statistics !== 9 ? (state.statistics += 1) : (state.statistics = 0);
      } else if (action.payload === 'star') {
        state.star !== 9 ? (state.star += 1) : (state.star = 0);
      }
    },
    sliderStatePrev: (state, action) => {
      if (action.payload === 'keyword') {
        state.keyword !== 0 ? (state.keyword -= 1) : (state.keyword = 9);
      } else if (action.payload === 'statistics') {
        state.statistics !== 0 ? (state.statistics -= 1) : (state.statistics = 9);
      } else if (action.payload === 'star') {
        state.star !== 0 ? (state.star -= 1) : (state.star = 9);
      }
    },
  },
});

const periodSlice = createSlice({
  name: 'periodReducer',
  initialState: periodState,
  reducers: {
    periodDataUpdate: (state, action) => {
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.useAble = true;
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

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
  statistics: statisticsSlice.reducer,
  star: starSlice.reducer,
  period: periodSlice.reducer,
  slider: sliderSlice.reducer,
  page: pageSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {keywordDataUpdate} = keywordSlice.actions;

export const {statisticsDataUpdate, chartStateUpdate, keywordStateUpdate} = statisticsSlice.actions;

export const {starDataUpdate, starPieSliceStateUpdate} = starSlice.actions;

export const {periodDataUpdate} = periodSlice.actions;

export const {sliderStateNext, sliderStatePrev} = sliderSlice.actions;

export const {currentPage} = pageSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
