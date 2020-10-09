import {periodDateUpdate, periodDataUpdate} from '../store/reducers/period';
import { starDataUpdate } from '../store/reducers/star';
import {RootDispatch} from '../store/store';
import {getApi} from './API/dataAPI';

export const fetchStarData = async (dispatch: RootDispatch, id: string) => {
  const starData = await getApi.star(id);
  starData? dispatch(starDataUpdate(starData)):console.log('star data API error');
};

export const fetchPeriodData = async (dispatch: RootDispatch, id: string, start:string, end:string) => {
    dispatch(periodDateUpdate({start,end}));
    const periodData = await getApi.period(id, start, end);
    periodData?dispatch(periodDataUpdate(periodData)):console.log('period data API error');
  };