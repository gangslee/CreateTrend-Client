import React from 'react'
import { BGFirst } from '../../Components/Container/BGContiner'
import styled from 'styled-components';

const Container = styled.div`
   width:1200px;
   margin:0px auto;
`

const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin-top:90px;
  margin-bottom:30px;
`;

const Red = styled.span`
  color: #dd0909;
`;

const InfoContainer = styled.div`
    display:flex;
    justify-content:space-between;
    height:270px;
    margin-top:70px;
`
const Thumbnail = styled.img`
    width:480px;
`

const VideoInfo = styled.div`
    width:685px;
    border:1px solid #000;
`
function VideoDetailPresenter(){
    return <BGFirst>
        <Container>
            <Slogan>"영상 상세 분석을 통해 영상에 대한 보다 <Red>자세한 분석 결과</Red>를 확인해보세요"</Slogan>
            <InfoContainer>
                <Thumbnail/>
                <VideoInfo></VideoInfo>
            </InfoContainer>
        </Container>
    </BGFirst>
}

export default VideoDetailPresenter;