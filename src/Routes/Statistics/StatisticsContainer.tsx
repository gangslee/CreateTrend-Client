import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  statisticsDataUpdate,
  chartStateUpdate,
  currentPage,
  keywordStateUpdate,
  IKeywordChartData,
  keywordDetailUpdate,
  disableUseAbleStatistics,
} from '../../store';
import ChannelPresenter from './StatisticsPresenter';
import {getApi} from '../../api';

function mapStateToProps(state: RootState) {
  return {
    useAble: state.statistics.useAble,
    currents: {
      chart: state.statistics.currentChart,
      keyword: state.statistics.currentKeyword,
    },
    title: state.statistics.keywordChart
      ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
          state.statistics.currentKeyword
        ].name
      : null,
    data: state.statistics.keywordChart,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: {
      list: (data: IKeywordChartData[]) => {
        dispatch(currentPage('statistics'));
        dispatch(statisticsDataUpdate(data));
      },
      keyword: (data: IKeywordChartData) => {
        dispatch(keywordDetailUpdate(data));
      },
    },
    stateFuncs: {
      chart: () => {
        dispatch(disableUseAbleStatistics());
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(disableUseAbleStatistics());
        dispatch(keywordStateUpdate(n));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChannelContainer({useAble, currents, title, data, update, stateFuncs}: Props) {
  console.log('1');
  useEffect(() => {
    const type = currents.chart === 0 ? '인기' : '영상화';
    const fetchData = async () => {
      try {
        const statisticsData = data === null ? (await getApi.statistics()).data : data;
        if (data === null) {
          update.list(statisticsData);
        }
        if (
          data === null ||
          (data !== null && data[currents.chart].keyword[currents.keyword].visit === false)
        ) {
          const keywordData = (
            await getApi.statisticsKeyword(
              type,
              statisticsData[currents.chart].keyword[currents.keyword].name
            )
          ).data;
          update.keyword(keywordData);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currents.chart, currents.keyword, update]);

  return <ChannelPresenter funcs={stateFuncs} title={title} />;
  // return <h1>123</h1>;
}

export default connector(ChannelContainer);
