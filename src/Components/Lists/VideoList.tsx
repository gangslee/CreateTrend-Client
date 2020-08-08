import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, sliderStateNext, sliderStatePrev} from '../../store';
import Slider from '../Slider';

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  padding: 20px;
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
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;
`;

interface IImageProps {
  bgUrl: string;
}

const Image = styled.div`
  width: 35%;
  height: 120px;
  margin-right: 20px;
  border-radius: 5px;
  background-image: url(${({bgUrl}: IImageProps) => bgUrl});
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
  font-size: 14px;
  font-weight: 600;
  :nth-child(2) {
    margin-bottom: 10px;
  }
  :nth-child(odd) {
    color: #feb100;
    font-size: 16px;
  }
  :last-child {
    color: #5577ff;
  }
`;

function mapStateToProps(state: RootState) {
  return {data: state.keyword.video};
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: number, type: boolean) => {
      dispatch(type ? sliderStateNext(data) : sliderStatePrev(data));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IVideoListProps extends Props {
  type: string;
}

function VideoList({data, update, type}: IVideoListProps) {
  function handleOnClick(e: React.MouseEvent) {
    const usingDataIdx = data.indexOf(data.filter((data) => data.type === type)[0]);
    e.currentTarget.id === 'next' ? update(usingDataIdx, true) : update(usingDataIdx, false);
  }

  const usingData = data.filter((data) => data.type === type)[0];
  console.log(usingData);
  return (
    <Container>
      <Title>리그오브레전드</Title>
      <Title>인기 영상</Title>
      <Slider onClick={handleOnClick}>
        <VideoContainer>
          <Image bgUrl={usingData.data[usingData.current].thumbnail} />
          <InfoContainer>
            <Info>영상 제목</Info>
            <Info>{usingData.data[usingData.current].name}</Info>
            <Info>관련 키워드</Info>
            <Info>
              {usingData.data[usingData.current].keyword.map((word, index) =>
                index !== usingData.data[usingData.current].keyword.length - 1
                  ? `#${word}, `
                  : `#${word}`
              )}
            </Info>
          </InfoContainer>
        </VideoContainer>
      </Slider>
    </Container>
  );
}

export default connector(VideoList);
