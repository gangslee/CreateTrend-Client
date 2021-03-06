import React, { useRef } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';

import store, { RootState, RootDispatch } from '../../store/store';
import { setIsOpenSignIn, setIsOpenSignUp, setIsOpenUserMenu } from '../../store/reducers/header';
import Dialog from './Dialog';
import { signOut } from '../../actions/auth';
import { searchTermUpdate } from '../../store/reducers/home';

// Component에 사용될 style을 포함한 Element들을 선언
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1220px;
  height: 73px;
  background-color: #fff;
  z-index: 1;
  border-bottom: 3px solid #d10909;
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 73px;
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
  position: relative;
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
  cursor: pointer;
`;

const RightItem = styled.span`
  font-size: 14px;
  font-family: 'S-CoreDream-4Regular';
  line-height: 1.36;
  color: #666;
  letter-spacing: normal;
  cursor: pointer;
  :nth-child(2) {
    margin: 0px 17.5px;
  }
`;

interface ISLinkProps {
  location: string;
}

const SLink = styled(Link)`
  color: ${({ location }: ISLinkProps) => (location === '/predict' ? '#d10909' : '#222')};
`;

const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const UserMenuContainer = styled.div`
  width: 390px;
  height: 310px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 20px 0 rgba(95, 111, 174, 0.2);
  box-sizing: border-box;
  padding: 0px 25px;
  position: absolute;
  top: 40px;
  right: 50px;
  font-stretch: normal;
  letter-spacing: normal;
  color: #222;
`;

const UserMenuHalfContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'S-CoreDream-4Regular';
  padding: 25px 0px;
  :first-child {
    border-bottom: 1px solid #dbe0f5;
  }
`;

const UserAvatar = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const UserInfoContainer = styled.div``;

const UserInfoHalfContainer = styled.div`
  margin-bottom: 10px;
`;

const UserName = styled.span`
  font-family: 'S-CoreDream-6Bold';
  font-size: 18px;
  line-height: 1.39;
  margin-right: 10px;
`;

const UserMemberShipState = styled.span`
  font-size: 12px;
  line-height: 1.33;
`;

const UserMemberShipStateRed = styled.span`
  font-size: 14px;
  color: #d10909;
`;

const UserEmail = styled.span`
  font-size: 15px;
  line-height: 1.4;
  color: #999999;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const MenuIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const MenuTitle = styled.span`
  display: inline-block;
  font-size: 15px;
  line-height: 1.4;
  margin-top: 10px;
  cursor: pointer;
`;

const SignOutBt = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f4f6fb;
  font-family: 'S-CoreDream-6Bold';
  font-size: 16px;
  line-height: 1.44;
  border-radius: 10px;
  cursor: pointer;
`;

const NoMembershipContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  border: solid 1px #333;
`;

const NoMembership = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 15px;
  line-height: 1.4;
  margin-left: 5px;
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      signIn: state.header.isOpenSignIn,
      signUp: state.header.isOpenSignUp,
      isAuthenticated: state.auth.isAuthenticated,
      userMenu: state.header.isOpenUserMenu,
      membership: state.auth.user ? state.auth.user.userinfo.on_subscribe : null,
    },
  };
} // store의 state들을 props로 mapping

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      signIn: (isOpen: boolean) => dispatch(setIsOpenSignIn(isOpen)),
      signUp: (isOpen: boolean) => dispatch(setIsOpenSignUp(isOpen)),
      userMenu: (isOpen: boolean) => dispatch(setIsOpenUserMenu(isOpen)),
      clearSearchBar: () => dispatch(searchTermUpdate('')),
    },
  };
} // store의 dispatch들을 props로 mapping

const connector = connect(mapStateToProps, mapDispatchToProps);
// 해당 Component에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;
// 넘겨줄 props를 type화

function Header({ states, dispatches, history }: Props) {
  const wrapperRef = useRef(null); // 사용자 메뉴의 영역 지정

  const handleOnClickLogo = (e: React.MouseEvent) => {
    dispatches.clearSearchBar();
  }; // 로고 클릭시 메인 이동 후 검색 창 초기화

  const handleOnClickSignIn = (e: React.MouseEvent) => {
    dispatches.signIn(true);
  }; // 로그인 modal 열기

  const handleOnClickSignUp = (e: React.MouseEvent) => {
    dispatches.signUp(true);
  }; // 회원가입 modal 열기

  const handleOnClickUserIcon = (e: React.MouseEvent) => {
    dispatches.userMenu(true);
    document.addEventListener('click', closeUserMenu);
  }; // 사용자 메뉴 열기

  const closeUserMenu = (e: MouseEvent) => {
    if (!(wrapperRef.current && wrapperRef.current.contains(e.target))) {
      dispatches.userMenu(false);
      document.removeEventListener('click', closeUserMenu);
    }
  }; // 사용자 메뉴가 열려 있을 시 사용자 메뉴 이외의 영역을 클릭시 사용자 메뉴 종료

  const handleOnClickSignOut = (e: React.MouseEvent) => {
    dispatches.userMenu(false);
    document.removeEventListener('click', closeUserMenu);
    signOut(store.getState(), store.dispatch);
  }; // 로그아웃

  // 브라우저 상단 Global Navigation Bar Component 생성
  return (
    <Container>
      {/* 로그인/회원가입 modal */}
      <Dialog type={(states.signIn && 'signIn') || (states.signUp && 'signUp')} />

      <HeaderContainer>
        <HalfContainer>
          <Link to="/" onClick={handleOnClickLogo}>
            <Logo src={require('../../Asset/images/logo.svg')} />
          </Link>

          <LeftItem>
            <SLink to="/predict" location={history.location.pathname}>
              조회수 예측
            </SLink>
          </LeftItem>
        </HalfContainer>

        <HalfContainer>
          {/* 사용자 메뉴 */}
          {states.userMenu && (
            <UserMenuContainer ref={wrapperRef}>
              <UserMenuHalfContainer>
                <UserAvatar src={require('../../Asset/images/Login_Myinfo_icon.svg')} />
                <UserInfoContainer>
                  <UserInfoHalfContainer>
                    <UserName>이경수</UserName>
                    {states.membership && (
                      <UserMemberShipState>
                        <UserMemberShipStateRed>멤버쉽 이용중</UserMemberShipStateRed>{' '}
                        (20-08-21까지)
                      </UserMemberShipState>
                    )}
                  </UserInfoHalfContainer>
                  <UserEmail>abcd1234@email.com</UserEmail>
                </UserInfoContainer>
              </UserMenuHalfContainer>

              {states.membership ? (
                <UserMenuHalfContainer>
                  <MenuContainer>
                    <MenuIcon src={require('../../Asset/images/Channel analysis_icon.svg')} />
                    <MenuTitle>내 채널 분석</MenuTitle>
                  </MenuContainer>
                  <MenuContainer>
                    <MenuIcon src={require('../../Asset/images/Info_icon.svg')} />
                    <MenuTitle>내 정보</MenuTitle>
                  </MenuContainer>
                  <MenuContainer>
                    <MenuIcon src={require('../../Asset/images/Customer Service_icon.svg')} />
                    <MenuTitle>고객센터</MenuTitle>
                  </MenuContainer>
                </UserMenuHalfContainer>
              ) : (
                <NoMembershipContainer>
                  <MenuIcon src={require('../../Asset/images/No_membership_icon.svg')} />
                  <NoMembership>이용권을 구매해주세요</NoMembership>
                </NoMembershipContainer>
              )}
              <SignOutBt onClick={handleOnClickSignOut}>로그아웃</SignOutBt>
            </UserMenuContainer>
          )}

          {states.isAuthenticated ? (
            <UserIcon
              src={require('../../Asset/images/Login_Myinfo_icon.svg')}
              onClick={handleOnClickUserIcon}
            />
          ) : (
            <>
              <RightItem onClick={handleOnClickSignIn}>로그인</RightItem>
              <RightItem>|</RightItem>
              <RightItem onClick={handleOnClickSignUp}>회원가입</RightItem>
            </>
          )}
        </HalfContainer>
      </HeaderContainer>
    </Container>
  );
}

export default withRouter(connector(Header));
// connector를 통해 store의 state를 해당 Component의 props로 전달
