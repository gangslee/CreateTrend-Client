import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

const Popular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-weight: 600;
  /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3); */
`;

const PopularTitle = styled.span`
  font-size: 25px;
`;

const PopularContent = styled.span`
  font-size: 40px;
`;

function mapStateToProps(state: RootState) {
  return {
    popular:
      state.statistics.keywordChart[state.statistics.currentChart].keyword[
        state.statistics.currentKeyword
      ].popular,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ITextContainerProps extends Props {
  type: string;
}

function TextContainer({type, popular}: ITextContainerProps) {
  return (
    <Popular>
      <PopularTitle>평균 인기도</PopularTitle>
      <PopularContent>{popular}%</PopularContent>
    </Popular>
  );
}

export default connector(TextContainer);
