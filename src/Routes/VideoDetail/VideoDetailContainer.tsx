import React, { useLayoutEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchData } from '../../actions/videoDetail';
import store from '../../store/store';
import VideoDetailPresenter from './VideoDetailPresenter';

interface IParamsProps {
  idx: string;
  title: string;
}

function VideoDetailContainer({ match }: RouteComponentProps<IParamsProps>) {
  useLayoutEffect(() => {
    fetchData(store.dispatch, match.params.idx);
  }, [match.params.idx]);
  return <VideoDetailPresenter title={decodeURIComponent(match.params.title)} />;
}

export default VideoDetailContainer;
