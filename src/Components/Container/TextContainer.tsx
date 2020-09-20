import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store/store';

const Popular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-weight: 600;
  /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3); */
`;

const PopularContent = styled.span`
  font-size: 40px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    font-size: 22px;
    margin-right: 5px;
  }
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
  title: string;
}

function TextContainer({type, popular, title}: ITextContainerProps) {
  return (
    <Popular>
      <Title>{title}</Title>
      <Title>평균 인기도</Title>
      <PopularContent>{popular}%</PopularContent>
    </Popular>
  );
}

export default connector(TextContainer);
