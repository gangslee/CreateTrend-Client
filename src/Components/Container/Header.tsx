import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border: 1px solid #aaa;
`;

export default function Header() {
  return <Container></Container>;
}
