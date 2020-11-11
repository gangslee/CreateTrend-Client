import { RootState, RootDispatch } from "../../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { setRadioState } from "../../../store/reducers/keyword";

function mapStateToProps(state: RootState) {
  return {
    data: state.keyword,
  };
} // store의 state들을 props로 mapping

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      radio: () => {
        dispatch(setRadioState());
      },
    },
  };
} // store의 dispatch들을 props로 mapping

export const connector = connect(mapStateToProps, mapDispatchToProps);
// KeywordPresenter에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언 후 export

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  search: string;
  searchKeyword: () => void;
  clickWord: (word: string) => void;
}
// 넘겨줄 props와 추가로 요청받을 props를 type화 시킨 후 export
