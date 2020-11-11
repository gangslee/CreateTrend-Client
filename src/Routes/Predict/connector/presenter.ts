import { RootState, RootDispatch } from "../../../store/store";
import { connect, ConnectedProps } from "react-redux";
import {
  filterKeyword,
  pushKeyword,
  setThumbnail,
  setTextData,
  setKeywordResultCurrent,
  setAdvance,
} from "../../../store/reducers/predict";

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.predict,
    },
  };
} // store의 state들을 props로 mapping

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      setThumbnail: (thumbnail: string | ArrayBuffer) => {
        dispatch(setThumbnail({ thumbnail }));
      },
      setTextData: (text: {
        title: string;
        subscriber: string;
        date: string;
      }) => {
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
} // store의 dispatch들을 props로 mapping

export const connector = connect(mapStateToProps, mapDispatchToProps);
// PredictPresenter에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언 후 export

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  getData: () => void;
  getDataFromKeyword: () => void;
}
// 넘겨줄 props와 추가로 요청받을 props를 type화 시킨 후 export
