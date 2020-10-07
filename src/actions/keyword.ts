import { keywordDataUpdate, setLoading } from "../store/reducers/keyword";
import { RootDispatch } from "../store/store";
import { getApi } from "./API/dataAPI";

export const fetchData = async (dispatch: RootDispatch, search: string) => {
  dispatch(setLoading());
  const data = await getApi.keyword(search);
  data === null
    ? console.log("keyword API error")
    : dispatch(keywordDataUpdate(data));
};
