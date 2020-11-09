import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, RootDispatch } from '../../store/store';
import { sliderStateNext, sliderStatePrev } from '../../store/reducers/slider';
import Slider from '../Container/Slider';
import { Link } from 'react-router-dom';

const TEN_THOUSANDS = 10000;
const HUNDREAD_MILLIONS: number = 100000000;
const REGEX = /\B(?=(\d{3})+(?!\d))/g;

interface IVideoListStyleProps {
  type?: string;
  mode?: string;
}

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ImageContainer = styled(Link)`
  display: inline-block;
  width: 270px;
  background-color: white;
  padding: 15px 15px 20px 15px;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
`;

const StarImageContainer = styled(Link)<IVideoListStyleProps>`
  display: inline-block;
  width: ${({ mode }) => (mode === 'analysis' ? '45%' : '55%')};
  height: ${({ mode }) => (mode === 'analysis' ? '180px' : '110px')};
  margin-right: ${({ mode }) => (mode === 'analysis' ? '20px' : '15px')};
`;

const Image = styled.img<IVideoListStyleProps>`
  width: 100%;
  height: ${({ type, mode }) => (type === 'star' && mode === 'aside' ? '110px' : '180px')};
  border-radius: 10px;
  &:hover {
    filter: brightness(80%);
  }
  transition: filter 0.3s linear, background-image 0.3s linear;
  cursor: pointer;
`;

const Title = styled.div`
  height: 42px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  line-height: 1.4;
  margin: 10px 0px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const InfoContainer = styled.div`
  font-family: 'S-CoreDream-5Medium';
  display: flex;
  justify-content: space-between;
`;

const Info = styled.span`
  font-size: 12px;
  line-height: 1.3;
`;

const SliderInfoContainer = styled.div`
  width: 65%;
`;

const SliderInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
  :nth-child(2) {
    margin-bottom: 20px;
  }
  :nth-child(even) {
    font-family: 'S-CoreDream-4Regular';
  }
  :nth-child(odd) {
    color: #d10909;
    font-size: 20px;
    margin-bottom: 10px;
  }
  :last-child {
    color: #5577ff;
  }
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

interface OwnProps {
  type: string;
}

function changeForm(n: number): string {
  return n >= HUNDREAD_MILLIONS
    ? `${(n / HUNDREAD_MILLIONS).toFixed(0)}억`
    : n >= TEN_THOUSANDS
    ? `${(n / TEN_THOUSANDS).toFixed(0)}만`
    : `${n.toString().replace(REGEX, ',')}`;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  if (ownProps.type === 'keyword') {
    return {
      states: { data: state.keyword.video, current: state.slider.keyword },
    };
  } else if (ownProps.type === 'statistics') {
    return {
      states: {
        data:
          state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ].video,
        current: state.slider.statistics,
      },
    };
  } else if (ownProps.type === 'star') {
    return {
      states: {
        data: state.star.video.concat(state.period.video),
        current: state.slider.star,
      },
    };
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

function VideoList({ states, update, mode, type }: IVideoListProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    const direction = e.currentTarget.id === 'next' ? true : false;
    update({ page: type, len: usingData.data.length - 1 }, direction);
  };

  const usingData = states.data.filter((data) => data.type === mode)[0];

  const current = states.current;

  return usingData.data.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
    </ErrorContainer>
  ) : (
    <>
      {type === 'keyword' || type === 'statistics' ? (
        <Grid>
          {usingData.data.slice(0, 4).map((data) => (
            <ImageContainer
              key={data.video_id}
              to={`/detail/${data.idx}/${encodeURIComponent(data.video_name)}`}
            >
              <Image src={data.thumbnail_url} />
              <Title>{data.video_name}</Title>
              <InfoContainer>
                <Info>{`조회수 ${changeForm(data.views)} views`}</Info>
                <Info>{`인기도 ${data.popularity.toFixed(0)}%`}</Info>
              </InfoContainer>
            </ImageContainer>
          ))}
        </Grid>
      ) : mode === 'analysis' ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <StarImageContainer
              mode={mode}
              to={`/detail/${usingData.data[current].idx}/${encodeURIComponent(
                usingData.data[current].video_name
              )}`}
            >
              <Image src={usingData.data[current].thumbnail_url} />
            </StarImageContainer>
            <SliderInfoContainer>
              <SliderInfo>영상 제목</SliderInfo>
              <SliderInfo>{usingData.data[current].video_name}</SliderInfo>
              <SliderInfo>관련 키워드</SliderInfo>
              <SliderInfo>
                {usingData.data[current].videokeywordnew
                  .slice(0, 5)
                  .map((word) => `#${word.keyword}   `)}
              </SliderInfo>
            </SliderInfoContainer>
          </VideoContainer>
        </Slider>
      ) : (
        <>
          {usingData.data.slice(0, 5).map((data, index) => (
            <VideoContainer key={index}>
              <StarImageContainer
                type={type}
                to={`/detail/${data.idx}/${encodeURIComponent(data.video_name)}`}
              >
                <Image src={data.thumbnail_url} type={type} mode={mode} />
              </StarImageContainer>
              <VideoTitle>{data.video_name}</VideoTitle>
            </VideoContainer>
          ))}
        </>
      )}
    </>
  );
}

export default connector(VideoList);
