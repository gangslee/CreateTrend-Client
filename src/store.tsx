import {configureStore, createSlice, combineReducers} from '@reduxjs/toolkit';

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
  }[];
}

export interface ICommentData {
  avatar: string;
  comment: string;
  thumbnail: string;
  link: string;
}

export interface ILineChartData {
  name: string;
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
    popular?: number;
    wordmap?: IWordMapData[];
    line?: ILineChartData[];
    video?: IVideoListData[];
    pie?: IPieChartData[];
  }[];
  chartType?: string;
  current?: number;
}

export interface IVideoListData {
  type: string;
  data: {
    id: string;
    name: string;
    thumbnail: string;
    keyword?: string[];
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
    sliderStateNextKeyword: (state, action) => {
      state.video[action.payload].current === 4
        ? (state.video[action.payload].current = 0)
        : (state.video[action.payload].current += 1);
    },
    sliderStatePrevKeyword: (state, action) => {
      state.video[action.payload].current === 0
        ? (state.video[action.payload].current = 4)
        : (state.video[action.payload].current -= 1);
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
    sliderStateNextStatistics: (state, action) => {
      const current = state.keywordChart[state.currentChart].current;
      state.keywordChart[state.currentChart].keyword[current].video[0].current === 4
        ? (state.keywordChart[state.currentChart].keyword[current].video[0].current = 0)
        : (state.keywordChart[state.currentChart].keyword[current].video[0].current += 1);
    },
    sliderStatePrevStatistics: (state, action) => {
      const current = state.keywordChart[state.currentChart].current;
      state.keywordChart[state.currentChart].keyword[current].video[0].current === 0
        ? (state.keywordChart[state.currentChart].keyword[current].video[0].current = 4)
        : (state.keywordChart[state.currentChart].keyword[current].video[0].current -= 1);
    },
  },
});

export interface IStarState {
  channelInfo: {
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
  video: IVideoListData[];
  useAble?: boolean;
}

const starState: IStarState = {
  channelInfo: null,
  keyword: null,
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
  page: pageSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {
  keywordDataUpdate,
  sliderStateNextKeyword,
  sliderStatePrevKeyword,
} = keywordSlice.actions;

export const {
  statisticsDataUpdate,
  chartStateUpdate,
  keywordStateUpdate,
  sliderStateNextStatistics,
  sliderStatePrevStatistics,
} = statisticsSlice.actions;

export const {starDataUpdate, starPieSliceStateUpdate} = starSlice.actions;

export const {currentPage} = pageSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
