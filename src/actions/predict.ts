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
  data ? dispatch(setResult(data)) : console.log('predict API error');
};

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
  state.predict.isAdvance && console.log(must_keyword, must_not_keyword);
  const data = state.predict.isAdvance
    ? await getApi.predictKeywordAdvance(keyword_string, must_keyword, must_not_keyword)
    : await getApi.predictKeyword(keyword_string);
  state.predict.isAdvance && console.log(data);
  data ? dispatch(setKeywordResult(data)) : console.log('predict keyword search API error');
};
