import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 990px;
  height: 65px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.2);
  border: solid 2px #dd0909;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 900px;
  font-family: 'S-CoreDream-5Medium';
  font-stretch: normal;
  font-style: normal;
  line-height: 16px;
  letter-spacing: normal;
  font-size: 16px;
  color: #222;
  border: none;
  :focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  background-color: #dd0909;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

export default function SearchBar() {
  return (
    <Form>
      <Input />
      <IconContainer>
        <Icon src={require('../../Asset/images/Search.svg')} />
      </IconContainer>
    </Form>
  );
}
