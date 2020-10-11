import React, { useLayoutEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import store, { RootState } from "../../store/store";
import StarPresenter from "./StarPresenter";
import { fetchStarData, fetchPeriodData } from "../../actions/star";
import { RouteComponentProps } from "react-router-dom";

function mapStateToProps(state: RootState) {
  return {
    states:{
      start: state.period.start,
      end:state.period.end,
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    } 
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  id: string;
}

type Props = PropsFromRedux&RouteComponentProps<IParamsProps>;

const periodLine = async (id: string, start: string, end: string) => {
  fetchPeriodData(store.dispatch, id, start,end) 
};


function StarContainer({ states, history, match }: Props) {
  useLayoutEffect(() => {
    
    const today = new Date();
    const end = today.toJSON().slice(0, 10);
    today.setDate(today.getDate() - 50);
    const start = today.toJSON().slice(0, 10);
    fetchStarData(store.dispatch, match.params.id)
    fetchPeriodData(store.dispatch, match.params.id, start,end)
  }, [match.params.id]);

  const searchKeyword = () => {
    history.push(
      `/${states.searchType === 0 ? "keyword" : "searchyoutuber"}/${
        states.searchTerm
      }`
    );
  };

  return (
    <StarPresenter
      id={match.params.id}
      period={`${states.start} ~ ${states.end}`}
      periodLine={periodLine}
      searchKeyword={searchKeyword}
    />
  );
}

export default connector(StarContainer);
