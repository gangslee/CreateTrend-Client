import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

function mapStateToProps(state: RootState) {
  return {
    states: {
      search: state.home,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  youtuber_name: string;
}

export type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;
