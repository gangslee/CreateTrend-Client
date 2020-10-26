import React from 'react';
import {fetchData} from '../../actions/predict';
import store from '../../store/store';
import PredictPresenter from './PredictPresenter';

function PredictContainer() {
  const getData = () => {
    fetchData(store.getState(), store.dispatch);
  };

  return <PredictPresenter getData={getData} />;
}

export default PredictContainer;
