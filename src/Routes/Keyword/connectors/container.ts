import { RootState } from "../../../store/store";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

function mapStateToProps(state: RootState) {
  return {
    states: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
} // store의 state들을 props로 mapping

export const connector = connect(mapStateToProps);
// KeywordContainer에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언 후 export

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IParamsProps {
  search: string;
}

export type Props = PropsFromRedux & RouteComponentProps<IParamsProps>;
// 넘겨줄 props와 추가로 요청받을 props를 type화 시킨 후 export
