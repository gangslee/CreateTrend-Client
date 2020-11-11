import React from 'react';
import styled from 'styled-components';

// Component에 사용될 style을 포함한 Element들을 선언
const Notice = styled.div`
  display: none;
  width: 260px;
  min-height: 90px;
  box-shadow: 5px 5px 10px 0 rgba(95, 111, 174, 0.3);
  background-color: #d10909;
  position: absolute;
  top: 25px;
  left: 30px;
  border-radius: 10px;
  border-top-left-radius: 0;
  padding: 20px 25px;
  font-family: 'S-CoreDream-4Regular';
  font-weight: normal;
  font-size: 15px;
  line-height: 1.67;
  color: #fff;
  z-index: 1;
`;

const NoticeIcon = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #b8c0e1;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  line-height: 2;
  text-align: center;
  font-family: 'S-CoreDream-5Medium';
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  &:hover {
    ${Notice} {
      display: inline-block;
      transition: all 1s ease-in-out;
    }
  }
`;

interface Props {
  text: string;
}

// 페이지 내 Component 설명 tooltip Component 생성
export default function NoticeTooltip({ text }: Props) {
  return (
    <Container>
      <NoticeIcon>?</NoticeIcon>
      <Notice>{text}</Notice>
    </Container>
  );
}
