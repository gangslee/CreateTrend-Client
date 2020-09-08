import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, currentPage} from '../../store';
import HomePresenter from '../Home/HomePresenter';

function mapStateToProps(state: RootState) {
  return {
    searchTerm: state.home.searchTerm,
    searchType: state.home.searchType,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    setPage: () => dispatch(currentPage('home')),
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

function HomeContainer(props: IHomeContainerProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.history.push(`/${props.searchType === 0 ? 'keyword' : 'star'}/${props.searchTerm}`);
  };
  props.setPage();
  return <HomePresenter submit={handleSubmit} />;
}

export default connector(HomeContainer);
