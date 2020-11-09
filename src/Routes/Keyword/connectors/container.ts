import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

function mapStateToProps(state: RootState) {
  return {
    states: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  search: string;
}

export type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;
