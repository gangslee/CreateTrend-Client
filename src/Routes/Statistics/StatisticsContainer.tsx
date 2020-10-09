import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import store, {RootDispatch} from '../../store/store';

import {chartStateUpdate, keywordStateUpdate} from '../../store/reducers/statistics';
import StatisticsPresenter from './StatisticsPresenter';
import {fetchData} from '../../actions/statistics';

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      chart: () => {
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(keywordStateUpdate(n));
      },
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StatisticsContainer({dispatches}: Props) {
  useLayoutEffect(() => {
    fetchData(store.getState(), store.dispatch);
  });

  return <StatisticsPresenter funcs={dispatches} />;
}

export default connector(StatisticsContainer);
