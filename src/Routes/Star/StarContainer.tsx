import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  statisticsDataUpdate,
  currentPage,
  IKeywordChartData,
} from '../../store';

function mapStateToProps(state: RootState) {
  return {
    useAble: state.star,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordChartData[]) => {
      if (data) {
        dispatch(currentPage('star'));
        dispatch(statisticsDataUpdate(data));
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StarContainer({useAble}: Props) {
  console.log(useAble);
  return <h1>StarContainer</h1>;
}

export default connector(StarContainer);
