import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
`;

const Divider = styled.div`
  height: 3px;
  background-image: linear-gradient(to right, #950707 0%, #fb4242);
`;

export default function Header() {
  return (
    <Container>
      <Divider />
    </Container>
  );
}
