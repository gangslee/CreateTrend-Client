import React, { useLayoutEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchData } from '../../actions/videoDetail';
import store from '../../store/store';
import VideoDetailPresenter from './VideoDetailPresenter';

interface IParamsProps {
  idx: string;
  title: string;
} // route에 포함된 parameter들을 type으로 선언

// 영상 상세 분석 페이지의 Data Logic Component 생성
function VideoDetailContainer({ match }: RouteComponentProps<IParamsProps>) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    fetchData(store.dispatch, match.params.idx);
  }, [match.params.idx]); // Component 생성 시 API를 통해 서버로부터 data 요청

  return <VideoDetailPresenter title={decodeURIComponent(match.params.title)} />;
}

export default VideoDetailContainer;
