import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  background-color: #fff;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  padding: 0px 10px;
`;

const HalfContainer = styled.div`
  display: inline-flex;
  align-items: center;
  font-stretch: normal;
  letter-spacing: normal;
`;

const Logo = styled.img`
  width: 174px;
  height: 60px;
  object-fit: contain;
  margin-right: 30px;
`;

const LeftItem = styled.span`
  font-size: 16px;
  font-family: 'S-CoreDream-6Bold';
  line-height: 1.44;
  color: #222;
  :last-child {
    margin-left: 50px;
  }
`;

const RightItem = styled.span`
  font-size: 14px;
  font-family: 'S-CoreDream-4Regular';
  line-height: 1.36;
  color: #666;
  letter-spacing: normal;
  :nth-child(2) {
    margin: 0px 17.5px;
  }
`;

const Divider = styled.div`
  height: 3px;
  background-image: linear-gradient(to right, #950707 0%, #fb4242);
`;

export default withRouter(() => (
  <Container>
    <HeaderContainer>
      <HalfContainer>
        <Link to="/">
          <Logo src={require('../../Asset/images/logo.svg')} />
        </Link>

        <LeftItem>이용권 구매</LeftItem>
        <Link to="/statistics">
          <LeftItem>채널 분석</LeftItem>
        </Link>
      </HalfContainer>
      <HalfContainer>
        <RightItem>로그인</RightItem>
        <RightItem>|</RightItem>
        <RightItem>회원가입</RightItem>
      </HalfContainer>
    </HeaderContainer>
    <Divider />
  </Container>
));