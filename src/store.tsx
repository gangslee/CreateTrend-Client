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

export interface IKeywordChartData {
  chartType: string;
  keyword: {
    name: string;
    popular?: number;
    wordmap?: IWordMapData[];
    line?: ILineChartData[];
    video?: IVideoListData[];
  }[];
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

export interface IChannelData {
  channelType: string;
  keywordChart: IKeywordChartData[];
}

interface IChannelState {
  channel: IChannelData[];
  currentChannel?: number;
  currentChart?: number;
  useAble?: boolean;
}

const channelState: IChannelState = {
  channel: null,
  currentChannel: 0,
  currentChart: 0,
  useAble: false,
};

const channelSlice = createSlice({
  name: 'channelReducer',
  initialState: channelState,
  reducers: {
    channelDataUpdate: (state, action) => {
      if (action.payload) {
        state.channel = action.payload;
        state.useAble = true;
      }
    },
    channelStateUpdate: (state) => {
      state.currentChannel === 0 ? (state.currentChannel = 1) : (state.currentChannel = 0);
      state.currentChart = 0;
    },
    chartStateUpdate: (state) => {
      state.currentChart === 0 ? (state.currentChart = 1) : (state.currentChart = 0);
    },
    keywordStateUpdate: (state, action) => {
      state.channel[state.currentChannel].keywordChart[state.currentChart].current = action.payload;
    },
    sliderStateNextChannel: (state, action) => {
      const current = state.channel[state.currentChannel].keywordChart[state.currentChart].current;
      state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[current].video[0]
        .current === 4
        ? (state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[
            current
          ].video[0].current = 0)
        : (state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[
            current
          ].video[0].current += 1);
    },
    sliderStatePrevChannel: (state, action) => {
      const current = state.channel[state.currentChannel].keywordChart[state.currentChart].current;
      state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[current].video[0]
        .current === 0
        ? (state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[
            current
          ].video[0].current = 4)
        : (state.channel[state.currentChannel].keywordChart[state.currentChart].keyword[
            current
          ].video[0].current -= 1);
    },
  },
});

const pageSlice = createSlice({
  name: 'pageReducer',
  initialState: 'HOME',
  reducers: {
    currentPage: (state, action) => (state = action.payload),
  },
});

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
  channel: channelSlice.reducer,
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
  channelDataUpdate,
  channelStateUpdate,
  chartStateUpdate,
  keywordStateUpdate,
  sliderStateNextChannel,
  sliderStatePrevChannel,
} = channelSlice.actions;

export const {currentPage} = pageSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
