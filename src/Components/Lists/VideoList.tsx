import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, sliderStateNext, sliderStatePrev} from '../../store';
import Slider from '../Container/Slider';

interface IVideoListStyleProps {
  mode?: string;
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
  width: ${({mode}: IVideoListStyleProps) => (mode === 'analysis' ? '45%' : '55%')};
  height: ${({mode}: IVideoListStyleProps) => (mode === 'analysis' ? '180px' : '95px')};
  margin-right: ${({mode}: IVideoListStyleProps) => (mode === 'analysis' ? '20px' : '15px')};
  border-radius: 10px;
  background-image: url(${({bgUrl}: IVideoListStyleProps) => bgUrl});
  background-size: cover;
  background-position: center center;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.3s linear, background-image 0.3s linear;
  cursor: pointer;
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
  width: 44%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  -webkit-line-clamp: 4;
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
  return {
    states: {
      data: {
        keyword: state.keyword,
        statistics: state.statistics,
        star: state.star,
        period: state.period,
      },
      sliderCurrent: {
        keyword: state.slider.keyword,
        statistics: state.slider.statistics,
        star: state.slider.star,
      },
    },
  };
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

function VideoList({states, update, mode, type}: IVideoListProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    const direction = e.currentTarget.id === 'next' ? true : false;
    update({page: type, len: usingData.data.length - 1}, direction);
  };

  const data =
    (type === 'keyword' && states.data.keyword.video) ||
    (type === 'statistics' &&
      states.data.statistics.keywordChart[states.data.statistics.currentChart].keyword[
        states.data.statistics.currentKeyword
      ].video) ||
    (type === 'star' && states.data.star.video.concat(states.data.period.video));

  const usingData = data.filter((data) => data.type === mode)[0];

  const current =
    type === 'keyword'
      ? states.sliderCurrent.keyword
      : type === 'statistics'
      ? states.sliderCurrent.statistics
      : states.sliderCurrent.star;

  return usingData.data.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
    </ErrorContainer>
  ) : (
    <>
      {mode === 'analysis' ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <Image bgUrl={usingData.data[current].thumbnail_url} mode={mode} />
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
