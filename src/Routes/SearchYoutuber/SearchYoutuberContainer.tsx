import React, { useLayoutEffect } from 'react';

import store from '../../store/store';
import { fetchData } from '../../actions/searchYoutuber';
import SearchYoutuberPresenter from './SearchYoutuberPresenter';
import { connector, Props } from './connectors/container';

function SearchYoutuberContainer({ states, match, history }: Props) {
  useLayoutEffect(() => {
    fetchData(store.dispatch, match.params.youtuber_name);
  }, [match]);

  const searchKeyword = async () => {
    if (match.params.youtuber_name === states.search.searchTerm && states.search.searchType === 1) {
      fetchData(store.dispatch, match.params.youtuber_name);
    } else {
      history.push(
        `/${states.search.searchType === 0 ? 'keyword' : 'searchYoutuber'}/${encodeURIComponent(
          states.search.searchTerm
        )}`
      );
    }
  };

  return (
    <SearchYoutuberPresenter
      youtuberName={match.params.youtuber_name}
      searchKeyword={searchKeyword}
    />
  );
}

export default connector(SearchYoutuberContainer);
