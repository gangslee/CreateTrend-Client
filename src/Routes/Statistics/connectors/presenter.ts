import { RootState, RootDispatch } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { chartStateUpdate, keywordStateUpdate } from '../../../store/reducers/statistics';

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.statistics,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      chart: () => {
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(keywordStateUpdate(n));
      },
    },
  };
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  searchKeyword: () => void;
}
