import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {BGFirst} from '../../Components/Container/BGContiner';
import {RootState} from '../../store/store';

const Container = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 30px;
`;

const Red = styled.span`
  color: #dd0909;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 270px;
  margin-top: 70px;
`;
const Thumbnail = styled.img`
  width: 480px;
  border-radius: 5px;
`;

const VideoInfo = styled.div`
  width: 685px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.videoDetail,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function VideoDetailPresenter({states}: Props) {
  return (
    <BGFirst>
      <Container>
        <Slogan>
          "영상 상세 분석을 통해 영상에 대한 보다 <Red>자세한 분석 결과</Red>를 확인해보세요"
        </Slogan>
        <InfoContainer>
          {states.data.video && <Thumbnail src={states.data.video.video.thumbnail_url} />}
          <VideoInfo></VideoInfo>
        </InfoContainer>
      </Container>
    </BGFirst>
  );
}

export default connector(VideoDetailPresenter);
