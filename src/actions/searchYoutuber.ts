import { setData } from "../store/reducers/searchYoutuber";
import { RootState, RootDispatch } from "../store/store";
import { getApi } from "./dataAPI";

export const fetchData = async (
  state: RootState,
  dispatch: RootDispatch,
  searchTerm: string
) => {
  const { results } = await getApi.searchYoutuber(searchTerm);
  dispatch(setData(results));
};
