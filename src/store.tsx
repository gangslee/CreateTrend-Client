import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

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
  name: string;
  data: string[];
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
  name: "keywordReducer",
  initialState: keywordData,
  reducers: {
    keywordDataUpdate: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.useAble = true;
    },
    sliderStateNext: (state, action) => {
      state.video[action.payload].current === 4
        ? (state.video[action.payload].current = 0)
        : (state.video[action.payload].current += 1);
    },
    sliderStatePrev: (state, action) => {
      state.video[action.payload].current === 0
        ? (state.video[action.payload].current = 4)
        : (state.video[action.payload].current -= 1);
    },
  },
});

export interface IChannelData {
  channelType: string;
  keywordChart: {
    chartType: string;
    keyword: {
      keywordName: string;
      popular: number;
      wordmap: IWordMapData[];
      line: ILineChartData[];
      video: IVideoListData[];
    }[];
  }[];
}

interface IChannelState {
  channel: IChannelData[];
  currentChannel?: number;
  currentChart?: number;
  currentKeyword?: number[];
  useAble?: boolean;
}

const channelState: IChannelState = {
  channel: null,
  currentChannel: 0,
  currentChart: 0,
  currentKeyword: [0, 0],
  useAble: false,
};

const channelSlice = createSlice({
  name: "channelReducer",
  initialState: channelState,
  reducers: {
    channelDataUpdate: (state, action) => {
      if (action.payload) {
        state.channel = action.payload;
        state.useAble = true;
      }
    },
  },
});

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
  channel: channelSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {
  keywordDataUpdate,
  sliderStateNext,
  sliderStatePrev,
} = keywordSlice.actions;

export const { channelDataUpdate } = channelSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
