import {setData, setLoading} from '../store/reducers/searchYoutuber';
import {RootState, RootDispatch} from '../store/store';
import {getApi} from './dataAPI';

export const fetchData = async (state: RootState, dispatch: RootDispatch, searchTerm: string) => {
  dispatch(setLoading());
  const {results} = await getApi.searchYoutuber(searchTerm);
  dispatch(setData(results));
};
