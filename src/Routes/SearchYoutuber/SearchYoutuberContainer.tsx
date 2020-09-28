import React, {useLayoutEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';

import store, {RootState} from '../../store/store';
import {fetchData} from '../../actions/searchYoutuber';
import SearchYoutuberPresenter from './SearchYoutuberPresenter';

function mapStateToProps(state: RootState) {
  return {
    states: {
      search: state.home,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  youtuber_name: string;
}

type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;

function SearchYoutuberContainer({states, match, history}: Props) {
  useLayoutEffect(() => {
    fetchData(store.getState(), store.dispatch, match.params.youtuber_name);
  }, [match]);

  const searchKeyword = async () => {
    if (match.params.youtuber_name === states.search.searchTerm && states.search.searchType === 1) {
      fetchData(store.getState(), store.dispatch, match.params.youtuber_name);
    } else {
      history.push(
        `/${states.search.searchType === 0 ? 'keyword' : 'searchYoutuber'}/${
          states.search.searchTerm
        }`
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
