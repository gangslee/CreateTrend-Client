import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  box-sizing: border-box;
  margin: 50px auto;
`;

const TitleContainer = styled.div`
  margin-top: 180px;
  text-align: center;
`;

const Title = styled.span`
  display: inline-block;
  font-size: 80px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #222;
`;

const TitleRed = styled.span`
  color: #d10909;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-4Regular';
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #222;
  margin-top: 20px;
`;

const Temp = styled.div`
  font-family: 'S-CoreDream-5Medium';
`;

function HomePresenter() {
  return (
    <Container>
      <TitleContainer>
        <Title>
          <TitleRed>Youtube</TitleRed> AI assistant
        </Title>
        <Subtitle>AI가 현재의 당신 채널을 분석하고 개선방향을 찾아드립니다.</Subtitle>
      </TitleContainer>

      {/* <Temp>리그오브레전드</Temp> */}
    </Container>
  );
}

export default HomePresenter;
