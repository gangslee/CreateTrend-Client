import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.videoDetail,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IPresenterProps extends Props {
  title: string;
}
