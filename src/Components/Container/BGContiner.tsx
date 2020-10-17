import React from 'react';
import styled from 'styled-components';

import bg1 from '../../Asset/images/bg1.svg'
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
  box-sizing:border-box;
`;

const BgContainerFirst = styled.div`
  min-width:1440px;
  background-image: url(${bg1});
  padding-left: 100px;
  margin-left: -100px;
  margin-top: -100px;
  padding-top: 170px;
  padding-bottom: 50px;
  font-family: 'S-CoreDream-6Bold';
  font-stretch: normal;
  letter-spacing: normal;
  color: #222;
  min-height: 110.5vh;
`;

interface Props {
  children: React.ReactNode;
}

export function BGFirst({children}: Props) {
  return <BgContainerFirst >{children}</BgContainerFirst>;
}

export function BGSecond({children}: Props) {
  return <BgContainerSecond>{children}</BgContainerSecond>;
}
