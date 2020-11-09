import React, { useLayoutEffect } from 'react';

import store from '../../store/store';
import StarPresenter from './StarPresenter';
import { fetchStarData, fetchPeriodData } from '../../actions/star';
import { connector, Props } from './connectors/container';

const periodLine = async (id: string, start: string, end: string) => {
  fetchPeriodData(store.dispatch, id, start, end);
};

function StarContainer({ states, history, match }: Props) {
  useLayoutEffect(() => {
    const today = new Date();
    const end = today.toJSON().slice(0, 10);
    today.setDate(today.getDate() - 50);
    const start = today.toJSON().slice(0, 10);
    fetchStarData(store.dispatch, match.params.id);
    fetchPeriodData(store.dispatch, match.params.id, start, end);
  }, [match.params.id]);

  const searchKeyword = () => {
    history.push(`/${states.searchType === 0 ? 'keyword' : 'searchyoutuber'}/${states.searchTerm}`);
  };

  return (
    <StarPresenter
      id={match.params.id}
      period={`${states.start} ~ ${states.end}`}
      channel={match.params.name}
      periodLine={periodLine}
      searchKeyword={searchKeyword}
    />
  );
}

export default connector(StarContainer);
