import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { connect, ConnectedProps } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';

import store, { RootState, RootDispatch } from '../../store/store';
import { setIsOpenSignIn, setIsOpenSignUp } from '../../store/reducers/header';
import { signIn, signUp } from '../../actions/auth';

// Component에 사용될 style을 포함한 Element들을 선언
const Container = styled.div`
  width: 350px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 5px;
  text-align: center;
`;

const DialogTitle = styled.span`
  font-family: 'S-CoreDream-6Bold';
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #222222;
`;

const SForm = styled.form`
  margin-top: 40px;
`;

const InputContainer = styled.div`
  text-align: left;

  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const InputTitle = styled.span`
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #222222;
`;

const SInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 10px;
  border: solid 1px #dbe0f5;
  background-color: #f4f6fb;
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.4;
  padding: 10px 15px;
  font-family: 'S-CoreDream-5Medium';
  :focus {
    background-color: #fafaff;
  }
`;

const SBt = styled.button`
  background-color: #dd0909;
  font-size: 15px;
  font-family: 'S-CoreDream-6Bold';
  width: 100%;
  border-radius: 10px;
  color: white;
  line-height: 3;
  transition: background 0.5s ease;
  cursor: pointer;
  :active,
  :hover {
    background-color: #c90000;
  }
  margin-top: 10px;
`;

const GoogleBt = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 20px;
  box-shadow: 3px 3px 8px 0 rgba(95, 111, 174, 0.1);
  border: solid 1px #dbe0f5;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :active,
  :hover {
    border: solid 2px #dbe0f5;
  }
`;

const GoogleSymbol = styled.img`
  width: 28.6px;
  height: 28.6px;
  margin-right: 20px;
`;

const GoogleSpan = styled.span`
  font-family: 'S-CoreDream-6Bold';
  font-size: 15px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
  overlay: {
    background: 'rgba(0,0,0,0.4)',
  },
};

function mapStateToProps(state: RootState) {
  return {
    states: {
      signIn: state.header.isOpenSignIn,
      signUp: state.header.isOpenSignUp,
    },
  };
} // store의 state들을 props로 mapping

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      signIn: (isOpen: boolean) => dispatch(setIsOpenSignIn(isOpen)),
      signUp: (isOpen: boolean) => dispatch(setIsOpenSignUp(isOpen)),
    },
  };
} // store의 dispatch들을 props로 mapping

const connector = connect(mapStateToProps, mapDispatchToProps);
// 해당 Component에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IDialogProps extends Props {
  type: string;
}
// 넘겨줄 props와 추가로 요청받을 props를 type화

// 로그인/로그아웃 modal Component 생성
function Dialog({ type, states, dispatches }: IDialogProps) {
  const handleCloseModal = () => {
    type === 'signIn' ? dispatches.signIn(false) : dispatches.signUp(false);
  }; // modal 종료 시키기 위해 dispatch를 통해 store의 state 변경

  const options = {
    autoConfig: true,
    debug: false,
  }; // react-facebook-pixel option 설정

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'signIn') {
      dispatches.signIn(false);
      signIn(inputState.email, inputState.password, store.dispatch);
    } else if (type === 'signUp') {
      if (inputState.password === inputState.passwordCheck) {
        dispatches.signUp(false);
        signUp(inputState.email, inputState.password, store.dispatch);
        ReactPixel.init('842225599925369', null, options);
        ReactPixel.track('Lead', null);
      } else {
        console.log(inputState);
        alert('password not match');
      }
    }
  }; // 로그인/회원가입 양식 제출시 modal의 state를 변경하고 서버로 부터 사용자 인증 요청

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  }; // Component 내 입력 양식 내 text data 변경 시 useState를 통해 상태 변경

  const [inputState, setInputState] = useState({
    email: '',
    password: '',
    passwordCheck: '',
  }); // useState로 페이지 내에서 사용되는 state 선언

  return (
    <Modal
      isOpen={type === 'signIn' ? states.signIn : states.signUp}
      style={modalStyles}
      ariaHideApp={false}
      onRequestClose={handleCloseModal}
      shouldCloseOnEsc={false}
    >
      <Container>
        <DialogTitle>{type === 'signIn' ? '로그인' : '회원가입'}</DialogTitle>

        {/* modal Container 내부 양식 */}
        <SForm onSubmit={handleOnSubmit}>
          <InputContainer>
            <InputTitle>이메일</InputTitle>
            <SInput name="email" onChange={handleOnChange} />
          </InputContainer>

          <InputContainer>
            <InputTitle>비밀번호</InputTitle>
            <SInput type="password" name="password" onChange={handleOnChange} />
          </InputContainer>

          {type === 'signUp' && (
            <InputContainer>
              <InputTitle>비밀번호 확인</InputTitle>
              <SInput type="password" name="passwordCheck" onChange={handleOnChange} />
            </InputContainer>
          )}

          <SBt>{type === 'signIn' ? '로그인' : '회원가입'}</SBt>

          <GoogleBt>
            <GoogleSymbol src={require('../../Asset/images/Google_symbol.svg')} />
            <GoogleSpan>구글 계정으로 로그인</GoogleSpan>
          </GoogleBt>
        </SForm>
      </Container>
    </Modal>
  );
}

export default connector(Dialog);
// connector를 통해 store의 state를 해당 Component의 props로 전달
