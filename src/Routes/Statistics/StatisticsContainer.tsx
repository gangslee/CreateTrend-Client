import React, {useLayoutEffect} from 'react';
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
} from '../../store/store';
import ChannelPresenter from './StatisticsPresenter';
import {getApi} from '../../actions/dataAPI';

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.statistics,
      currentData: state.statistics.keywordChart
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ]
        : null,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      update: {
        list: (data: IKeywordChartData[]) => {
          dispatch(statisticsDataUpdate(data));
        },
        keyword: (data: IKeywordChartData) => {
          dispatch(keywordDetailUpdate(data));
        },
        page: () => {
          dispatch(currentPage('statistics'));
        },
      },
      stateFuncs: {
        chart: () => {
          dispatch(chartStateUpdate());
        },
        keyword: (n: number) => {
          dispatch(keywordStateUpdate(n));
        },
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StatisticsContainer({states, dispatches}: Props) {
  const type = states.data.currentChart === 0 ? '인기' : '영상화';

  useLayoutEffect(() => {
    console.log('123');
    const getChartData = async () => {
      const {data} = await getApi.statistics();
      dispatches.update.list(data);
    };

    const getKeywordData = async () => {
      if (!states.currentData.visit) {
        const {data} = await getApi.statisticsKeyword(type, states.currentData.name);
        dispatches.update.keyword(data);
      }
    };
    const fetchData = async () => {
      try {
        states.data.isChecked ? getKeywordData() : getChartData();
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [dispatches.update, states.currentData, states.data.isChecked, type]);

  return (
    <ChannelPresenter
      funcs={dispatches.stateFuncs}
      title={states.data.keywordChart && states.currentData.name}
    />
  );
}

export default connector(StatisticsContainer);
