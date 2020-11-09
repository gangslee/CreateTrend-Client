import { RootState, RootDispatch } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import { setRadioState } from '../../../store/reducers/keyword';

function mapStateToProps(state: RootState) {
  return {
    data: state.keyword,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      radio: () => {
        dispatch(setRadioState());
      },
    },
  };
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  search: string;
  searchKeyword: () => void;
  clickWord: (word: string) => void;
}
