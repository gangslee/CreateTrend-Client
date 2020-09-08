import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, keywordDataUpdate, IKeywordData, currentPage} from '../../store';
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
    useAble: state.keyword.useAble,
    search: search,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordData) => {
      if (data) {
        dispatch(currentPage('keyword'));
        dispatch(keywordDataUpdate(data));
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function KeywordContainer({update, search}: Props) {
  useLayoutEffect(() => {
    const fetchData = async (search: string) => {
      try {
        const {data} = await getApi.keyword(search);
        update(data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };

    fetchData(search);
  }, [update, search]);

  return <KeywordPresenter search={search} />;
}

export default connector(KeywordContainer);
