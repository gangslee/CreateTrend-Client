import React, { useLayoutEffect } from "react";

import store from "../../store/store";
import KeywordPresenter from "./KeywordPresenter";
import { fetchData } from "../../actions/keyword";
import { Props } from "./connectors/container";
import { connector } from "./connectors/presenter";

// 키워드(콘텐츠) 분석 결과 페이지의 Data Logic Component 생성
function KeywordContainer({ states, history, match }: Props) {
  const { search } = match.params;

  useLayoutEffect(() => {
    fetchData(store.dispatch, search);
  }, [search]); // Component 생성 시 API를 통해 서버로부터 data 요청

  const searchKeyword = () => {
    if (search === states.searchTerm && states.searchType === 0) {
      fetchData(store.dispatch, search);
    } else {
      history.push(
        `/${
          states.searchType === 0 ? "keyword" : "searchYoutuber"
        }/${encodeURIComponent(states.searchTerm)}`
      );
    }
  }; // 검색 요청 시 router를 통해 검색 실행 시 검색 결과를 보여주는 route로 변경, 동일 검색타입/키워드 검색 시 서버로 부터 data 재요청

  const clickWord = (word: string) => {
    if (search === word) {
      fetchData(store.dispatch, search);
    } else {
      history.push(`/keyword/${word}`);
    }
  }; // 키워드 차트에 존재하는 키워드 클릭 시 router를 통해 검색 실행 시 검색 결과를 보여주는 route로 변경

  return (
    <KeywordPresenter
      search={search}
      searchKeyword={searchKeyword}
      clickWord={clickWord}
    />
  );
}

export default connector(KeywordContainer);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
