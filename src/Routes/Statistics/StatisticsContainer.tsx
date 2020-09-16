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
} from '../../store/store';
import ChannelPresenter from './StatisticsPresenter';
import {getApi} from '../../actions/api';

function mapStateToProps(state: RootState) {
  console.log(state.statistics.keywordChart);
  return {
    isChecked: state.statistics.isChecked,
    currents: {
      chart: state.statistics.currentChart,
      keyword: state.statistics.currentKeyword,
    },
    title:
      state.statistics.keywordChart &&
      state.statistics.keywordChart[state.statistics.currentChart].keyword.length > 0
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ].name
        : null,
    statisticsData: state.statistics.keywordChart,
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

function ChannelContainer({isChecked, currents, title, statisticsData, update, stateFuncs}: Props) {
  useEffect(() => {
    const type = currents.chart === 0 ? '인기' : '영상화';

    const fetchData = async () => {
      try {
        const {data} = isChecked
          ? statisticsData[currents.chart].keyword[currents.keyword].visit === false &&
            (await getApi.statisticsKeyword(
              type,
              statisticsData[currents.chart].keyword[currents.keyword].name
            ))
          : await getApi.statistics();

        isChecked
          ? statisticsData[currents.chart].keyword[currents.keyword].visit === false &&
            (await update.keyword(data))
          : await update.list(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [currents.chart, currents.keyword, isChecked, update]);

  return <ChannelPresenter funcs={stateFuncs} title={title} />;
}

export default connector(ChannelContainer);
