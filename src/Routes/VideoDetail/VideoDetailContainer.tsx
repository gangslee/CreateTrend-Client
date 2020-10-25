import React, { useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { fetchData } from '../../actions/videoDetail'
import store from '../../store/store'
import VideoDetailPresenter from './VideoDetailPresenter'

interface IParamsProps {
  idx: string;
}

function VideoDetailContainer({match}:RouteComponentProps<IParamsProps>){
    useLayoutEffect(()=>{
        fetchData(store.dispatch, match.params.idx)
    },[match.params.idx])
    return <VideoDetailPresenter/>
}

export default VideoDetailContainer;