import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store/store";

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.searchYoutuber.data,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function SearchYoutuberPresenter({ states }: Props) {
  console.log(states);
  return (
    <>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
      <h1>SearchYoutuberPresenter</h1>
    </>
  );
}

export default connector(SearchYoutuberPresenter);
