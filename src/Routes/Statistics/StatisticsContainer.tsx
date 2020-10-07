import React, { useLayoutEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState, RootDispatch, IKeywordChartData } from "../../store/store";
import {
  statisticsDataUpdate,
  chartStateUpdate,
  keywordStateUpdate,
  keywordDetailUpdate,
} from "../../store/reducers/statistics";
import StatisticsPresenter from "./StatisticsPresenter";
import { getApi } from "../../actions/API/dataAPI";

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.statistics,
      currentData: state.statistics.keywordChart
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ]
        : null,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      update: {
        list: (data: IKeywordChartData[]) => {
          dispatch(statisticsDataUpdate(data));
        },
        keyword: (
          data: IKeywordChartData,
          currentChart: number,
          currentKeyword: number
        ) => {
          dispatch(keywordDetailUpdate({ data, currentChart, currentKeyword }));
        },
      },
      stateFuncs: {
        chart: () => {
          dispatch(chartStateUpdate());
        },
        keyword: (n: number) => {
          dispatch(keywordStateUpdate(n));
        },
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StatisticsContainer({ states, dispatches }: Props) {
  const type = states.data.currentChart === 0 ? "인기" : "영상화";

  useLayoutEffect(() => {
    const getChartData = async () => {
      const data = await getApi.statistics();
      dispatches.update.list(data);
    };

    const getKeywordData = async () => {
      if (!states.currentData.visit) {
        const data = await getApi.statisticsKeyword(
          type,
          states.currentData.name
        );
        dispatches.update.keyword(
          data,
          states.data.currentChart,
          states.data.currentKeyword
        );
      }
    };
    const fetchData = async () => {
      try {
        states.data.isChecked ? getKeywordData() : getChartData();
      } catch (e) {
        console.log("Statistics Container fetch error");
      }
    };

    fetchData();
  }, [dispatches.update, states.currentData, states.data, type]);

  return (
    <StatisticsPresenter
      funcs={dispatches.stateFuncs}
      title={states.data.keywordChart && states.currentData.name}
    />
  );
}

export default connector(StatisticsContainer);
