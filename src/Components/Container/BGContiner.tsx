import React from 'react';
import styled from 'styled-components';

import bg2 from '../../Asset/images/bg2.svg';

const BgContainerSecond = styled.div`
  min-width:1440px;
  background-image: url(${bg2});
  padding-left: 80px;
  margin-left: -80px;
  margin-top: -80px;
  padding-top: 150px;
  padding-bottom: 50px;
  font-family: 'S-CoreDream-6Bold';
  font-stretch: normal;
  letter-spacing: normal;
  color: #222;
  min-height: 110vh;
`;

interface Props {
  children: React.ReactNode;
}

export function BGSecond({children}: Props) {
  return <BgContainerSecond>{children}</BgContainerSecond>;
}
