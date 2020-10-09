import {setData, setLoading} from '../store/reducers/searchYoutuber';
import {RootDispatch} from '../store/store';
import {getApi} from './API/dataAPI';

export const fetchData = async (dispatch: RootDispatch, searchTerm: string) => {
  dispatch(setLoading());
  const {results} = await getApi.searchYoutuber(searchTerm);
  dispatch(setData(results));
};
