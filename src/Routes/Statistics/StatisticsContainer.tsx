import React, {useLayoutEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import StatisticsPresenter from "./StatisticsPresenter";
import { RouteComponentProps } from "react-router-dom";
import store, {RootState} from '../../store/store';
import {fetchData} from '../../actions/statistics';

function mapStateToProps(state: RootState){
  return {
    states:{
      currentData: state.statistics.keywordChart
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ]
        : null,
        data:state.statistics,
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

function StatisticsContainer({states, history}: Props) {
  useLayoutEffect(() => {
    fetchData(store.getState(), store.dispatch);
  },[states.currentData]);
  
  const searchKeyword = () => {
    history.push(
      `/${states.searchType === 0 ? "keyword" : "searchyoutuber"}/${
        states.searchTerm
      }`
    );
  };
  return <StatisticsPresenter searchKeyword={searchKeyword}/>;
}

export default connector(StatisticsContainer);
