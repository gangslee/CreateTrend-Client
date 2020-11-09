import { RootState, RootDispatch } from '../../../store/store';
import { connect, ConnectedProps } from 'react-redux';
import {
  filterKeyword,
  pushKeyword,
  setPredictData,
  setTextData,
  setKeywordResultCurrent,
  setAdvance,
} from '../../../store/reducers/predict';

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.predict,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      setThumbnail: (thumbnail: string | ArrayBuffer) => {
        dispatch(setPredictData({ thumbnail }));
      },
      setTextData: (text: { title: string; subscriber: string; date: string }) => {
        dispatch(setTextData({ ...text }));
      },
      pushKeyword: (formType: string) => {
        dispatch(pushKeyword(formType));
      },
      filterKeyword: (className: string, keyword: string) => {
        dispatch(filterKeyword({ className, keyword }));
      },
      setKeywordResultCurrent: (current: number) => {
        dispatch(setKeywordResultCurrent(current));
      },
      setAdvance: () => {
        dispatch(setAdvance());
      },
    },
  };
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  getData: () => void;
  getDataFromKeyword: () => void;
}
