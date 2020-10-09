import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import store, {RootState} from '../../store/store';
import StatisticsPresenter from './StatisticsPresenter';
import {fetchData} from '../../actions/statistics';

function mapStateToProps(state: RootState){
  return {
    states:{
      currentData: state.statistics.keywordChart
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ]
        : null,
    }
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StatisticsContainer({states}: Props) {
  useLayoutEffect(() => {
    fetchData(store.getState(), store.dispatch);
  },[states.currentData]);

  return <StatisticsPresenter />;
}

export default connector(StatisticsContainer);
