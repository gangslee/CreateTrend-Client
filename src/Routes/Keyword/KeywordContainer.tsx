import React, { useLayoutEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";

import store, { RootState } from "../../store/store";
import KeywordPresenter from "./KeywordPresenter";
import { fetchData } from "../../actions/keyword";

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

interface IParamsProps {
  search: string;
}

type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;

function KeywordContainer({ states, match }: Props) {
  const { search } = match.params;
  useLayoutEffect(() => {
    fetchData(store.dispatch, search);
  }, [search]);

  const history = useHistory();

  const searchKeyword = () => {
    if (search === states.searchTerm && states.searchType === 0) {
      fetchData(store.dispatch, search);
    } else {
      history.push(
        `/${states.searchType === 0 ? "keyword" : "searchYoutuber"}/${
          states.searchTerm
        }`
      );
    }
  };

  const clickWord = (word: string) => {
    if (search === word) {
      fetchData(store.dispatch, search);
    } else {
      history.push(`/keyword/${word}`);
    }
  };

  return (
    <KeywordPresenter
      search={search}
      searchKeyword={searchKeyword}
      clickWord={clickWord}
    />
  );
}

export default connector(KeywordContainer);
