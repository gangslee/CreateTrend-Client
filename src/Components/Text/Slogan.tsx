import React from 'react';
import styled from 'styled-components';

const SloganContainer = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin: 30px 0px;
`;

interface Props {
  children: React.ReactNode;
}

export default function Slogan({ children }: Props) {
  return <SloganContainer>{children}</SloganContainer>;
}
