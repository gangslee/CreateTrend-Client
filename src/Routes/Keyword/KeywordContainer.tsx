import React, { useLayoutEffect } from 'react';

import store from '../../store/store';
import KeywordPresenter from './KeywordPresenter';
import { fetchData } from '../../actions/keyword';
import { Props } from './connectors/container';
import { connector } from './connectors/presenter';

function KeywordContainer({ states, history, match }: Props) {
  const { search } = match.params;
  useLayoutEffect(() => {
    fetchData(store.dispatch, search);
  }, [search]);

  const searchKeyword = () => {
    if (search === states.searchTerm && states.searchType === 0) {
      fetchData(store.dispatch, search);
    } else {
      history.push(
        `/${states.searchType === 0 ? 'keyword' : 'searchYoutuber'}/${encodeURIComponent(
          states.searchTerm
        )}`
      );
    }
  };

  const clickWord = (word: string) => {
    if (search === word) {
      fetchData(store.dispatch, search);
    } else {
      history.push(`/keyword/${word}`);
    }
  };

  return <KeywordPresenter search={search} searchKeyword={searchKeyword} clickWord={clickWord} />;
}

export default connector(KeywordContainer);
