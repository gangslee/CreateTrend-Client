import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, setIsOpenSignIn, setIsOpenSignUp, setIsLogIn} from '../../store';

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
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      signIn: (isOpen: boolean) => dispatch(setIsOpenSignIn(isOpen)),
      signUp: (isOpen: boolean) => dispatch(setIsOpenSignUp(isOpen)),
      logIn: (isLogIn: boolean) => dispatch(setIsLogIn(isLogIn)),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IDialogProps extends Props {
  type: string;
}

function Dialog({type, states, dispatches}: IDialogProps) {
  const handleCloseModal = () => {
    type === 'signIn' ? dispatches.signIn(false) : dispatches.signUp(false);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    type === 'signIn' ? dispatches.signIn(false) : dispatches.signUp(false);
    dispatches.logIn(true);
  };

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
        <SForm onSubmit={handleOnSubmit}>
          <InputContainer>
            <InputTitle>이메일</InputTitle>
            <SInput />
          </InputContainer>
          <InputContainer>
            <InputTitle>비밀번호</InputTitle>
            <SInput />
          </InputContainer>
          {type === 'signUp' && (
            <InputContainer>
              <InputTitle>비밀번호 확인</InputTitle>
              <SInput />
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
