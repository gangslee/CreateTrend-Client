import {
  statisticsDataUpdate,
  keywordDetailUpdate,
  setLoadingChart,
} from '../store/reducers/statistics';
import { RootState, RootDispatch } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchData = async (state: RootState, dispatch: RootDispatch) => {
  state.statistics.isChecked ? getKeywordData(state, dispatch) : getChartData(dispatch);
}; // 차트에 사용될 키워드 리스트 여부에 따라 API 결정

// 페이지 최초 로드 시 서버로부터 차트에 사용될 키워드 리스트를 전달 받음
const getChartData = async (dispatch: RootDispatch) => {
  dispatch(setLoadingChart());
  const data = await getApi.statistics();
  data ? dispatch(statisticsDataUpdate(data)) : console.log('Statistics page get chart data error');
};

// 키워드 차트 data 전달 완료 or 확인 하지 않은 키워드 클릭 시 해당 키워드에 대한 data들을 서버로부터 전달 받음
const getKeywordData = async (state: RootState, dispatch: RootDispatch) => {
  const currentData = state.statistics.keywordChart
    ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
        state.statistics.currentKeyword
      ]
    : null;
  const currentChart = state.statistics.currentChart;
  const currentKeyword = state.statistics.currentKeyword;
  const type = state.statistics.currentChart === 0 ? '인기' : '영상화';
  if (!currentData.visit) {
    const data = await getApi.statisticsKeyword(type, currentData.name);
    data
      ? dispatch(keywordDetailUpdate({ data, currentChart, currentKeyword }))
      : console.log('Statistics page get detail data of chart keyword error');
  }
};
