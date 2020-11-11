import React from "react";
import { fetchData, fetchDataFromKeyword } from "../../actions/predict";
import store from "../../store/store";
import PredictPresenter from "./PredictPresenter";

// 조회수 예측 페이지의 Data Logic Component 생성
function PredictContainer() {
  const getData = () => {
    fetchData(store.getState(), store.dispatch);
  }; // 조회수 예측 실행시 API를 통해 서버로부터 data 요청

  const getDataFromKeyword = () => {
    fetchDataFromKeyword(store.getState(), store.dispatch);
  }; // 키워드 검색 실행시 API를 통해 서버로부터 data 요청

  return (
    <PredictPresenter
      getData={getData}
      getDataFromKeyword={getDataFromKeyword}
    />
  );
}

export default PredictContainer;
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
