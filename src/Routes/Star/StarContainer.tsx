import React, { useLayoutEffect } from 'react';

import store from '../../store/store';
import StarPresenter from './StarPresenter';
import { fetchStarData, fetchPeriodData } from '../../actions/star';
import { connector, Props } from './connectors/container';

const periodLine = async (id: string, start: string, end: string) => {
  fetchPeriodData(store.dispatch, id, start, end);
}; // 페이지 내 구독자수 추이 그래프의 action을 통해 검색 기간이 변경 된 경우 API를 통해 서버로부터 data 재요청

function StarContainer({ states, history, match }: Props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const today = new Date();
    const end = today.toJSON().slice(0, 10);
    today.setDate(today.getDate() - 50);
    const start = today.toJSON().slice(0, 10);
    fetchStarData(store.dispatch, match.params.id);
    fetchPeriodData(store.dispatch, match.params.id, start, end);
  }, [match.params.id]); // Component 생성 시 API를 통해 서버로부터 data 요청

  const searchKeyword = () => {
    history.push(`/${states.searchType === 0 ? 'keyword' : 'searchyoutuber'}/${states.searchTerm}`);
  }; // 검색 요청 시 router를 통해 검색 실행 시 검색 결과를 보여주는 route로 변경

  return (
    <StarPresenter
      id={match.params.id}
      period={`${states.start} ~ ${states.end}`}
      channel={match.params.name}
      periodLine={periodLine}
      searchKeyword={searchKeyword}
    />
  );
}

export default connector(StarContainer);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
