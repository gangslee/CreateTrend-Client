import React, { useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import store from "../../store/store";
import { fetchData } from "../../actions/searchYoutuber";
import SearchYoutuberPresenter from "./SearchYoutuberPresenter";

interface IParamsProps {
  youtuber_name: string;
}

function SearchYoutuberContainer(props: RouteComponentProps<IParamsProps>) {
  useLayoutEffect(() => {
    fetchData(
      store.getState(),
      store.dispatch,
      props.match.params.youtuber_name
    );
  });
  return <SearchYoutuberPresenter />;
}

export default SearchYoutuberContainer;
