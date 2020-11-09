import { RootState } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.searchYoutuber.data,
      page: state.searchYoutuber.page,
      loading: state.searchYoutuber.isLoading,
    },
  };
}

export const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  youtuberName: string;
  searchKeyword: () => void;
}
