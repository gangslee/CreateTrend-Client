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
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordChartData[]) => {
      if (data) {
        dispatch(currentPage('statistics'));
        dispatch(statisticsDataUpdate(data));
      }
    },
    stateFuncs: {
      chart: () => {
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(keywordStateUpdate(n));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChannelContainer({useAble, currents, update, stateFuncs}: Props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statisticsData = (await getApi.statistics()).data;
        const type = currents.chart === 0 ? '인기' : '영상화';
        const keywordData = (
          await getApi.statisticsKeyword(
            type,
            statisticsData[currents.chart].data[currents.keyword].name
          )
        ).data;
        console.log(keywordData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [update]);

  // return <ChannelPresenter funcs={stateFuncs} loading={useAble} />;
  return <h1>123</h1>;
}

export default connector(ChannelContainer);
