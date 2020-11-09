import React from 'react';
import styled from 'styled-components';

const RedSpan = styled.span`
  color: #dd0909;
`;

interface Props {
  children: React.ReactNode;
}

export default function Red({ children }: Props) {
  return <RedSpan>{children}</RedSpan>;
}
