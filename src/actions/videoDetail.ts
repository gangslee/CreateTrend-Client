import { setLoading, setData } from '../store/reducers/videoDetail';
import { RootDispatch } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchData = async (dispatch: RootDispatch, idx: string) => {
  dispatch(setLoading());
  const data = await getApi.videoDetail(idx);
  data ? dispatch(setData(data)) : console.log('video detail API error');
}; // 영상 상세 분석 페이지 접근 시 API를 통해 서버로부터 data를 전달 받음
