import { keywordDataUpdate, setLoading } from '../store/reducers/keyword';
import { RootDispatch } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchData = async (dispatch: RootDispatch, search: string) => {
  dispatch(setLoading());
  const data = await getApi.keyword(search);
  data === null ? console.log('keyword API error') : dispatch(keywordDataUpdate(data));
}; // 키워드(콘텐츠) 분석 페이지 접근 시 API를 통해 서버로부터 data를 전달 받음
