import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  keywordDataUpdate,
  IKeywordData,
  currentPage,
  callLoader,
} from '../../store';
import KeywordPresenter from './KeywordPresenter';
import {getApi} from '../../api';

interface OwnProps {
  match: {
    params: {
      search: string;
    };
  };
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  const {
    match: {
      params: {search},
    },
  } = ownProps;

  return {
    search: search,
    states: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      update: (data: IKeywordData) => {
        if (data) {
          dispatch(currentPage('keyword'));
          dispatch(keywordDataUpdate(data));
        }
      },
      callLoader: () => {
        dispatch(callLoader());
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IKeywordContainerProps extends Props {
  history: {
    push(url: string): void;
  };
  match: {
    params: {search: string};
  };
}

function KeywordContainer({states, dispatches, search, history}: IKeywordContainerProps) {
  useLayoutEffect(() => {
    const fetchData = async (search: string) => {
      try {
        const {data} = await getApi.keyword(search);
        dispatches.update(data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };

    fetchData(search);
  }, [dispatches, search]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatches.callLoader();
    history.push(`/${states.searchType === 0 ? 'keyword' : 'star'}/${states.searchTerm}`);
  };
  return <KeywordPresenter search={search} submit={handleSubmit} />;
}

export default connector(KeywordContainer);
