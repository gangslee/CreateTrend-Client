import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  padding: 20px 0px;
  margin-right: 10px;
`;

const TitleSpan = styled.span`
  font-size: 25px;
  color: #333;
  line-height: 1.4;
`;

interface Props {
  children: React.ReactNodeArray;
}

export default function Title({ children }: Props) {
  return (
    <TitleContainer>
      <TitleSpan>{children}</TitleSpan>
    </TitleContainer>
  );
}
