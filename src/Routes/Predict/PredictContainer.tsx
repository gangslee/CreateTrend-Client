import React from 'react';
import { fetchData } from '../../actions/predict';
import store from '../../store/store';
import PredictPresenter from './PredictPresenter';

function PredictContainer(){
    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetchData(store.getState(), store.dispatch)
    }

    return <PredictPresenter handleOnSubmit={handleOnSubmit}/>
}

export default PredictContainer;