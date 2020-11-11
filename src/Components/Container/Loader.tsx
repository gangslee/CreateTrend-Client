import React from 'react';
import styled from 'styled-components';

// Component에 사용될 style을 포함한 Element들을 선언
const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.img`
  width: 80px;
  height: 80px;
`;

// 로딩 Component 생성
function Loader() {
  return (
    <Container>
      <Spinner src={require('../../Asset/images/Spinner.gif')} alt="loading..." />
    </Container>
  );
}

export default Loader;
