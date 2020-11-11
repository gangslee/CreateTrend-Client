import { setKeywordResult, setLoading } from '../store/reducers/predict';
import { setResult } from '../store/reducers/predict';
import { RootDispatch, RootState } from '../store/store';
import { getApi } from './API/dataAPI';

export const fetchData = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(setLoading());

  const data = await getApi.predict(
    state.predict.thumbnail,
    state.predict.text.title,
    state.predict.text.subscriber,
    state.predict.text.date
  );
  data
    ? dispatch(setResult(data))
    : console.log('predict API error', state.predict.thumbnail, state.predict.text);
}; // 조회수 예측하기 기능 실행 시 서버로부터 data를 전달 받음

export const fetchDataFromKeyword = async (state: RootState, dispatch: RootDispatch) => {
  const keyword_string = state.predict.keywordList.keyword.join(' ');
  const must_keyword =
    state.predict.isAdvance &&
    (state.predict.keywordList.include.length === 0
      ? null
      : state.predict.keywordList.include.join(' '));
  const must_not_keyword =
    state.predict.isAdvance &&
    (state.predict.keywordList.exclude.length === 0
      ? null
      : state.predict.keywordList.exclude.join(' '));

  const data = state.predict.isAdvance
    ? await getApi.predictKeywordAdvance(keyword_string, must_keyword, must_not_keyword)
    : await getApi.predictKeyword(keyword_string);

  data ? dispatch(setKeywordResult(data)) : console.log('predict keyword search API error');
}; // 키워드 검색 시 서버로부터 data를 전달 받음
