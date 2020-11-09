import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

function mapStateToProps(state: RootState) {
  return {
    states: {
      currentData: state.statistics.keywordChart
        ? state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ]
        : null,
      data: state.statistics,
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux & RouteComponentProps;
