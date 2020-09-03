import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.4;
  position: relative;
  z-index: 1;
`;

function Dialog() {
  return <Container></Container>;
}

export default Dialog;
