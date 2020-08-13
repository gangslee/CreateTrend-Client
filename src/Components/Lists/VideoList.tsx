import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  sliderStateNextKeyword,
  sliderStatePrevKeyword,
  sliderStateNextStatistics,
  sliderStatePrevStatistics,
} from '../../store';
import Slider from '../Container/Slider';

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  padding: 20px 10px;
`;

interface ISCProps {
  mode?: string;
  type?: string;
  bgUrl?: string;
}

const TitleContainer = styled.div<ISCProps>`
  ${(props) =>
    props.mode === 'aside' &&
    css`
      text-align: center;
    `};
  padding: 0px 10px;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    margin-right: 5px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Image = styled.img`
  width: ${({mode}: ISCProps) => (mode === 'analysis' ? '35%' : '60%')};
  height: ${({mode, type}: ISCProps) =>
    mode === 'analysis' ? (type === 'keyword' ? '120px' : '200px') : '85px'};
  margin-right: ${({mode}: ISCProps) => (mode === 'analysis' ? '20px' : '5px')};
  border-radius: 5px;
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
  font-size: ${({type}: ISCProps) => (type === 'keyword' ? '14px' : '22px')};
  font-weight: 600;
  :nth-child(2) {
    margin-bottom: ${({type}: ISCProps) => (type === 'keyword' ? '10px' : '20px')};
  }
  :nth-child(odd) {
    color: #feb100;
    font-size: 16px;
  }
  :last-child {
    color: #5577ff;
  }
`;

const VideoTitle = styled.div`
  width: 40%;
  padding: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-size: 14px;
  font-weight: 600;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

function mapStateToProps(state: RootState) {
  if (state.page === 'keyword') {
    return {data: state.keyword.video};
  } else if (state.page === 'statistics') {
    const statistics = state.statistics;
    const statisticsList = statistics.keywordChart[statistics.currentChart];
    const statisticsData = statisticsList.keyword[statisticsList.current];
    return {data: statisticsData.video};
  } else if (state.page === 'star') {
    return {data: state.star.video};
  }
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    updates: {
      updateKeyword: (data: number, type: boolean) => {
        dispatch(type ? sliderStateNextKeyword(data) : sliderStatePrevKeyword(data));
      },
      updateChannel: (data: number, type: boolean) => {
        dispatch(type ? sliderStateNextStatistics(data) : sliderStatePrevStatistics(data));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IVideoListProps extends Props {
  mode: string;
  type: string;
}

function VideoList({data, updates, mode, type}: IVideoListProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    const usingDataIdx = data.indexOf(data.filter((data) => data.type === mode)[0]);
    const direction = e.currentTarget.id === 'next' ? true : false;
    if (type === 'keyword') {
      updates.updateKeyword(usingDataIdx, direction);
    } else if (type === 'statistics') {
      updates.updateChannel(usingDataIdx, direction);
    }
  };

  const usingData = data.filter((data) => data.type === mode)[0];

  return (
    <Container>
      <TitleContainer mode={mode}>
        <Title>리그오브레전드</Title>
        <Title>인기 영상</Title>
      </TitleContainer>
      {mode === 'analysis' ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <Image bgUrl={usingData.data[usingData.current].thumbnail} mode={mode} type={type} />
            <InfoContainer>
              <Info type={type}>영상 제목</Info>
              <Info type={type}>{usingData.data[usingData.current].name}</Info>
              <Info type={type}>관련 키워드</Info>
              <Info type={type}>
                {usingData.data[usingData.current].keyword.map((word, index) =>
                  index !== usingData.data[usingData.current].keyword.length - 1
                    ? `#${word}, `
                    : `#${word}`
                )}
              </Info>
            </InfoContainer>
          </VideoContainer>
        </Slider>
      ) : (
        <>
          {usingData.data.map((data, index) => (
            <VideoContainer key={data.id}>
              <Image bgUrl={usingData.data[index].thumbnail} mode={mode} />
              <VideoTitle>{data.name}</VideoTitle>
            </VideoContainer>
          ))}
        </>
      )}
    </Container>
  );
}

export default connector(VideoList);
