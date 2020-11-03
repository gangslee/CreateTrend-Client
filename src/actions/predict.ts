import { setKeywordResult, setLoading } from "../store/reducers/predict";
import { setResult } from "../store/reducers/predict";
import { RootDispatch, RootState } from "../store/store";
import { getApi } from "./API/dataAPI";

export const fetchData = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(setLoading());
  const data = await getApi.predict(
    state.predict.thumbnail,
    state.predict.text.title,
    state.predict.text.subscriber,
    state.predict.text.date
  );
  data ? dispatch(setResult(data)) : console.log("predict API error");
};

export const fetchDataFromKeyword = async (
  state: RootState,
  dispatch: RootDispatch
) => {
  const keyword_string = state.predict.keywordList.join(" ");
  const data = await getApi.predictKeyword(keyword_string);
  dispatch(setKeywordResult(data));
};
