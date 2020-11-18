import React, { useLayoutEffect } from 'react';

import store from '../../store/store';
import { fetchData } from '../../actions/searchYoutuber';
import SearchYoutuberPresenter from './SearchYoutuberPresenter';
import { connector, Props } from './connectors/container';

// 스타채널 검색 결과 페이지의 Data Logic Component를 생성
function SearchYoutuberContainer({ states, match, history }: Props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchData(store.dispatch, match.params.youtuber_name);
  }, [match]); // Component 생성 시 API를 통해 서버로부터 data 요청

  const searchKeyword = async () => {
    if (match.params.youtuber_name === states.search.searchTerm && states.search.searchType === 1) {
      fetchData(store.dispatch, match.params.youtuber_name);
    } else {
      history.push(
        `/${states.search.searchType === 0 ? 'keyword' : 'searchYoutuber'}/${encodeURIComponent(
          states.search.searchTerm
        )}`
      );
    }
  }; // 검색 요청 시 router를 통해 검색 실행 시 검색 결과를 보여주는 route로 변경, 동일 검색타입/키워드 검색 시 서버로 부터 data 재요청

  return (
    <SearchYoutuberPresenter
      youtuberName={match.params.youtuber_name}
      searchKeyword={searchKeyword}
    />
  );
}

export default connector(SearchYoutuberContainer);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
