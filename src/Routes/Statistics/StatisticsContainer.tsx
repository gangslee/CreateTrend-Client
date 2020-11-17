import React, { useLayoutEffect } from 'react';

import StatisticsPresenter from './StatisticsPresenter';
import store from '../../store/store';
import { fetchData } from '../../actions/statistics';
import { connector, Props } from './connectors/container';

// 유튜브 통계 분석(메인) 페이지의 Data Logic Component 생성
function StatisticsContainer({ states, history }: Props) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchData(store.getState(), store.dispatch);
  }, [states.currentData]); // Component 생성 시 API를 통해 서버로부터 data 요청

  const searchKeyword = () => {
    history.push(
      `/${states.searchType === 0 ? 'keyword' : 'searchyoutuber'}/${encodeURIComponent(
        states.searchTerm
      )}`
    );
  }; // 검색 요청 시 router를 통해 검색 실행 시 검색 결과를 보여주는 route로 변경

  return <StatisticsPresenter searchKeyword={searchKeyword} />;
}

export default connector(StatisticsContainer);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
