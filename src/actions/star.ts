import { periodDateUpdate, periodDataUpdate } from '../store/reducers/period';
import { starDataUpdate } from '../store/reducers/star';
import { RootDispatch } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchStarData = async (dispatch: RootDispatch, id: string) => {
  const starData = await getApi.star(id);
  starData ? dispatch(starDataUpdate(starData)) : console.log('star data API error');
}; // 스타채널 분석 페이지 접근 시 API를 통해 서버로부터 data를 전달 받음

export const fetchPeriodData = async (
  dispatch: RootDispatch,
  id: string,
  start: string,
  end: string
) => {
  dispatch(periodDateUpdate({ start, end }));
  const periodData = await getApi.period(id, start, end);
  periodData ? dispatch(periodDataUpdate(periodData)) : console.log('period data API error');
}; // 영상 상세 분석 페이지 접근 시 or 추이 그래프를 통해 검색 기간 변경 시 API를 통해 서버로부터 data를 전달 받음
