import React, { useLayoutEffect } from 'react';

import StatisticsPresenter from './StatisticsPresenter';
import store from '../../store/store';
import { fetchData } from '../../actions/statistics';
import { connector, Props } from './connectors/container';

function StatisticsContainer({ states, history }: Props) {
  useLayoutEffect(() => {
    fetchData(store.getState(), store.dispatch);
  }, [states.currentData]);

  const searchKeyword = () => {
    history.push(
      `/${states.searchType === 0 ? 'keyword' : 'searchyoutuber'}/${encodeURIComponent(
        states.searchTerm
      )}`
    );
  };
  return <StatisticsPresenter searchKeyword={searchKeyword} />;
}

export default connector(StatisticsContainer);
