import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, callLoader} from '../../store/store';
import HomePresenter from '../Home/HomePresenter';

function mapStateToProps(state: RootState) {
  return {
    states: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      callLoader: () => {
        dispatch(callLoader());
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IHomeContainerProps extends Props {
  history: {
    push(url: string): void;
  };
}

function HomeContainer({states, dispatches, history}: IHomeContainerProps) {
  const searchKeyword = () => {
    dispatches.callLoader();
    history.push(`/${states.searchType === 0 ? 'keyword' : 'star'}/${states.searchTerm}`);
  };

  return <HomePresenter searchKeyword={searchKeyword} />;
}

export default connector(HomeContainer);
