import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, currentPage, searchTermUpdate} from '../../store';
import HomePresenter from '../Home/HomePresenter';

function mapStateToProps(state: RootState) {
  return {
    searchTerm: state.home.searchTerm,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    setPage: () => dispatch(currentPage('home')),
    searchTerms: {
      update: (str: string) => dispatch(searchTermUpdate(str)),
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IHomeContainerProps extends Props {
  history: {
    push(url: string): void;
  };
}

function HomeContainer(props: IHomeContainerProps) {
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    props.history.push(`/keyword/${props.searchTerms}`);
  };

  useLayoutEffect(() => {});
  return <HomePresenter submit={submitSearch} />;
}

export default connector(HomeContainer);
