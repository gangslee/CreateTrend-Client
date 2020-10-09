import {statisticsDataUpdate, keywordDetailUpdate, setLoadingChart, setLoadingData} from '../store/reducers/statistics';
import {RootState, RootDispatch} from '../store/store';
import {getApi} from './API/dataAPI';

export const fetchData = async (state: RootState, dispatch: RootDispatch) => {
  state.statistics.isChecked ? getKeywordData(state, dispatch) : getChartData(dispatch);
};

const getChartData = async (dispatch: RootDispatch) => {
  dispatch(setLoadingChart())
  const data = await getApi.statistics();
  data ? dispatch(statisticsDataUpdate(data)) : console.log('Statistics page get chart data error');
};

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
    dispatch(setLoadingData())
    const data = await getApi.statisticsKeyword(type, currentData.name);
    data
      ? dispatch(keywordDetailUpdate({data, currentChart, currentKeyword}))
      : console.log('Statistics page get detail data of chart keyword error');
  }
};
