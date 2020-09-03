import React, {useLayoutEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, setIsOpen} from '../../store';
import Dialog from './Dialog';

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

function mapStateToProps(state: RootState) {
  return {
    states: {
      isOpen: state.header.isOpen,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    isOpen: (isOpen: boolean) => dispatch(setIsOpen(isOpen)),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Header({states, isOpen}: Props) {
  const handleOnClick = (e: React.MouseEvent) => {
    isOpen(true);
    console.log('111');
    console.log(states.isOpen);
  };
  return (
    <Container>
      {states.isOpen ? <Dialog /> : null}
      <HeaderContainer>
        <HalfContainer>
          <Link to="/">
            <Logo src={require('../../Asset/images/logo.svg')} />
          </Link>

          <LeftItem>이용권 구매</LeftItem>
          <LeftItem>
            <Link to="/statistics">채널 분석</Link>
          </LeftItem>
        </HalfContainer>
        <HalfContainer>
          <RightItem onClick={handleOnClick}>로그인</RightItem>
          <RightItem>|</RightItem>
          <RightItem>회원가입</RightItem>
        </HalfContainer>
      </HeaderContainer>
      <Divider />
    </Container>
  );
}

export default withRouter(connector(Header));
