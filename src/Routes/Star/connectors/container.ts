import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

function mapStateToProps(state: RootState) {
  return {
    states: {
      start: state.period.start,
      end: state.period.end,
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  id: string;
  name: string;
}

export type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;
