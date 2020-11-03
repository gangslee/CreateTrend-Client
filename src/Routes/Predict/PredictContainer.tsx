import React from "react";
import { fetchData, fetchDataFromKeyword } from "../../actions/predict";
import store from "../../store/store";
import PredictPresenter from "./PredictPresenter";

function PredictContainer() {
  const getData = () => {
    fetchData(store.getState(), store.dispatch);
  };

  const getDataFromKeyword = () => {
    fetchDataFromKeyword(store.getState(), store.dispatch);
  };

  return (
    <PredictPresenter
      getData={getData}
      getDataFromKeyword={getDataFromKeyword}
    />
  );
}

export default PredictContainer;
