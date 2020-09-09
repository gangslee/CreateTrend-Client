import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, sliderStateNext, sliderStatePrev} from '../../store';
import Slider from '../Container/Slider';

interface ISCProps {
  mode?: string;
  type?: string;
  bgUrl?: string;
}

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
`;

const Image = styled.img`
  width: ${({mode, type}: ISCProps) => (mode === 'analysis' ? '45%' : '60%')};
  height: ${({mode, type}: ISCProps) => (mode === 'analysis' ? '180px' : '85px')};
  margin-right: ${({mode}: ISCProps) => (mode === 'analysis' ? '20px' : '5px')};
  border-radius: 10px;
  background-image: url(${({bgUrl}: ISCProps) => bgUrl});
  background-size: cover;
  background-position: center center;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.3s linear, background-image 0.3s linear;
`;

const InfoContainer = styled.div`
  width: 65%;
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;

  :nth-child(2) {
    margin-bottom: 20px;
  }
  :nth-child(even) {
    font-family: 'S-CoreDream-4Regular';
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  :nth-child(odd) {
    color: #d10909;
    font-size: 20px;
    margin-bottom: 10px;
  }
  :last-child {
    color: #5577ff;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const VideoTitle = styled.div`
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-size: 14px;
  font-weight: 600;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Error = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

function mapStateToProps(state: RootState) {
  if (state.page === 'keyword') {
    return {data: state.keyword.video, current: state.slider.keyword};
  } else if (state.page === 'statistics') {
    return {
      data:
        state.statistics.keywordChart[state.statistics.currentChart].keyword[
          state.statistics.currentKeyword
        ].video,
      current: state.slider.statistics,
    };
  } else if (state.page === 'star') {
    return {data: state.star.video.concat(state.period.video), current: state.slider.star};
  }
}

interface ISliderState {
  page: string;
  len: number;
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: ISliderState, type: boolean) => {
      dispatch(type ? sliderStateNext(data) : sliderStatePrev(data));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IVideoListProps extends Props {
  mode: string;
  type: string;
  title?: string;
}

function VideoList({data, current, update, mode, type, title}: IVideoListProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    const direction = e.currentTarget.id === 'next' ? true : false;
    update({page: type, len: usingData.data.length - 1}, direction);
  };

  const usingData = data.filter((data) => data.type === mode)[0];

  return usingData.data.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
    </ErrorContainer>
  ) : (
    <>
      {mode === 'analysis' ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <Image bgUrl={usingData.data[current].thumbnail_url} mode={mode} type={type} />
            <InfoContainer>
              <Info>영상 제목</Info>
              <Info>{usingData.data[current].video_name}</Info>
              <Info>관련 키워드</Info>
              <Info>
                {usingData.data[current].videokeywordnew
                  .slice(0, 5)
                  .map((word, index) => `#${word.keyword}   `)}
              </Info>
            </InfoContainer>
          </VideoContainer>
        </Slider>
      ) : (
        <>
          {usingData.data.slice(0, 5).map((data, index) => (
            <VideoContainer key={index}>
              <Image bgUrl={usingData.data[index].thumbnail_url} mode={mode} />
              <VideoTitle>{data.video_name}</VideoTitle>
            </VideoContainer>
          ))}
        </>
      )}
    </>
  );
}

export default connector(VideoList);
