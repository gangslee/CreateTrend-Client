import React from 'react';
import styled from 'styled-components';

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

function Loader() {
  return (
    <Container>
      <Spinner src={require('../../Asset/images/Spinner.gif')} alt="loading..." />
    </Container>
  );
}

export default Loader;
