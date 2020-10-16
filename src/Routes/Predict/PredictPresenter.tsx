import React from 'react';
import styled from 'styled-components';

import { BGFirst } from '../../Components/Container/BGContiner';

const Container = styled.div`
   width:1220px;
   margin:0px auto;
`

const MainTitleContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 80px;
`;

const MainTitle = styled.span`
  display: inline-block;
  font-size: 45px;
  font-family: 'Lato';
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #222;
`;

const MainTitleRed = styled.span`
  color: #d10909;
`;

const MainSubtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-4Regular';
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #222;
  margin-top: 20px;
`;

const UploadContainer = styled.div`
    width:80%;
    margin:50px auto;
    padding:20px;
    background-color:white;
    box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
`
const Subtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 22px;
  line-height: 1.36;
`;

function PredictPresenter(){
    return <BGFirst>
        <Container>
        <MainTitleContainer>
        <MainTitle>
          <MainTitleRed>Youtube</MainTitleRed> AI assistant
        </MainTitle>
        <MainSubtitle>AI가 당신의 영상의 조회수를 예측해드립니다.</MainSubtitle>
      </MainTitleContainer>

      <UploadContainer>
          <Subtitle>영상 정보</Subtitle>
      </UploadContainer>
        </Container>
    </BGFirst>
}

export default PredictPresenter;