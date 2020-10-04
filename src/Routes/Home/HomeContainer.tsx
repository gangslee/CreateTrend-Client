import React from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store/store";
import HomePresenter from "./HomePresenter";

function mapStateToProps(state: RootState) {
  return {
    states: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IHomeContainerProps extends Props {
  history: {
    push(url: string): void;
  };
}

function HomeContainer({ states, history }: IHomeContainerProps) {
  const searchKeyword = () => {
    history.push(
      `/${states.searchType === 0 ? "keyword" : "searchyoutuber"}/${
        states.searchTerm
      }`
    );
  };

  return <HomePresenter searchKeyword={searchKeyword} />;
}

export default connector(HomeContainer);
