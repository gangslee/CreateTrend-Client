import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContainer = styled.div`
  width: 390px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 35px 25px;
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

const SBt = styled.button``;

interface IDialogProps {
  type: string;
}

function Dialog({type}: IDialogProps) {
  return (
    <Container>
      <DialogContainer>
        <DialogTitle>{type === 'signIn' ? '로그인' : '회원가입'}</DialogTitle>
        <SForm>
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
        </SForm>
      </DialogContainer>
    </Container>
  );
}

export default Dialog;
