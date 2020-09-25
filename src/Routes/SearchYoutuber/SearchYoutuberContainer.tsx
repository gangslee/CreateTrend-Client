import React from "react";
import { getApi } from "../../actions/dataAPI";

import SearchYoutuberPresenter from "./SearchYoutuberPresenter";

function SearchYoutuberContainer() {
  const data = getApi.searchYoutuber("유튜버");
  console.log(data);
  return <SearchYoutuberPresenter />;
}

export default SearchYoutuberContainer;
