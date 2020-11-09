import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: RootState) {
  return {
    states: { star: state.star, period: state.period },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  id: string;
  period: string;
  channel: string;
  periodLine: (id: string, start: string, end: string) => void;
  searchKeyword: () => void;
}
