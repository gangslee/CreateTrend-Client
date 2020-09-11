import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router';

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
  match: {
    params: {search: string};
  };
}

function KeywordContainer({states, dispatches, search}: IKeywordContainerProps) {
  useLayoutEffect(() => {
    dispatches.callLoader();
    const fetchData = async (search: string) => {
      const data = await getApi.keyword(search);
      data === null ? console.log('keyword API error') : dispatches.update(data);
    };

    fetchData(search);
  }, [dispatches, search]);

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search === states.searchTerm && states.searchType === 0) {
      dispatches.callLoader();
      const data = await getApi.keyword(search);
      data === null ? console.log('keyword API error') : dispatches.update(data);
    } else {
      history.push(`/${states.searchType === 0 ? 'keyword' : 'star'}/${states.searchTerm}`);
    }
  };
  return <KeywordPresenter search={search} submit={handleSubmit} />;
}

export default connector(KeywordContainer);
