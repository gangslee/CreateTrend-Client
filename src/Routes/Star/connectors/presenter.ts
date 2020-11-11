import { RootState } from "../../../store/store";
import { connect, ConnectedProps } from "react-redux";

function mapStateToProps(state: RootState) {
  return {
    states: { star: state.star, period: state.period },
  };
} // store의 state들을 props로 mapping

export const connector = connect(mapStateToProps);
// StarPresenter에 mapStateToProps의 props를 넘겨주는 connect 함수를 변수로 선언 후 export

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export interface IProps extends Props {
  id: string;
  period: string;
  channel: string;
  periodLine: (id: string, start: string, end: string) => void;
  searchKeyword: () => void;
}
// 넘겨줄 props와 추가로 요청받을 props를 type화 시킨 후 export
