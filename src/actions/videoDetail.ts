import {setLoading, setData} from '../store/reducers/videoDetail';
import {RootDispatch} from '../store/store';
import {getApi} from './API/dataAPI';

export const fetchData = async (dispatch: RootDispatch, idx: string) => {
  dispatch(setLoading());
  const data = await getApi.videoDetail(idx)
  dispatch(setData(data));
};
