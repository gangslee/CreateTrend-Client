import { setResult } from "../store/reducers/predict";
import { RootDispatch, RootState } from "../store/store";
import { getApi } from "./API/dataAPI";

export const fetchData = async (state:RootState, dispatch: RootDispatch) => {
  const data = await getApi.predict(state.predict.thumbnail, state.predict.text.title, state.predict.text.subscriber, state.predict.text.date)
  data? dispatch(setResult(data)): console.log('predict API error')
};
