import { AxiosRequestConfig } from "axios";

import store, { RootState, RootDispatch } from "../store/store";
import {} from "../store/reducers/auth";
import { getApi } from "./dataAPI";

export const fetchData = async (
  state: RootState,
  dispatch: RootDispatch,
  searchTerm: string
) => {
  const { results } = await getApi.searchYoutuber(searchTerm);
};
