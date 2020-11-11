import { setData, setLoading } from '../store/reducers/searchYoutuber';
import { RootDispatch } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchData = async (dispatch: RootDispatch, searchTerm: string) => {
  dispatch(setLoading());
  const { results } = await getApi.searchYoutuber(searchTerm);
  dispatch(setData(results));
}; // 유튜버 검색 결과 페이지 접근 시 API를 통해 서버로부터 data를 전달 받음
