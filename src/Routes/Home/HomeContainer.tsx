import React, { useLayoutEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootDispatch, currentPage } from "../../store";
import HomePresenter from "../Home/HomePresenter";

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    setPage: () => dispatch(currentPage("home")),
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function HomeContainer({}: Props) {
  useLayoutEffect(() => {});
  return <HomePresenter />;
}

export default connector(HomeContainer);
