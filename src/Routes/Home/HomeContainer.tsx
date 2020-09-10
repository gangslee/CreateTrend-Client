import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, currentPage, callLoader} from '../../store';
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
      setPage: () => dispatch(currentPage('home')),
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatches.callLoader();
    history.push(`/${states.searchType === 0 ? 'keyword' : 'star'}/${states.searchTerm}`);
  };
  dispatches.setPage();
  return <HomePresenter submit={handleSubmit} />;
}

export default connector(HomeContainer);
