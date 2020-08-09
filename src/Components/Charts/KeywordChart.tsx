import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

type styleType = {
  type: string;
};

const Container = styled.div`
  ${({type}: styleType) =>
    type === 'keyword' &&
    css`
      width: 330px;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
    `};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
  :last-child {
    color: #feb100;
    font-size: 25px;
  }
`;

const KeywordChartContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  padding: 5px 10px;
  font-size: ${({type}: styleType) => (type === 'keyword' ? '16px' : '18px')};
  font-weight: 600;
  :not(:last-child) {
    border-bottom: 2px solid #ddd;
  }
`;

const Rank = styled.div`
  display: inline-block;
  width: 10%;
  text-align: center;
`;

const KeywordContainer = styled.div`
  display: inline-block;
  width: 89%;
  text-align: center;
`;

const Keyword = styled.span`
  cursor: pointer;
`;

function mapStateToProps(state: RootState) {
  return {
    data:
      state.page === 'keyword'
        ? state.keyword.keyword
        : [
            state.channel.channel[state.channel.currentChannel].keywordChart[
              state.channel.currentChart
            ],
          ],
    state: {
      page: state.page,
      channel: state.channel.currentChannel,
      chart: state.channel.currentChart,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IKeywordChartProps extends Props {
  index?: number;
}

function KeywordChart({data, state, index}: IKeywordChartProps) {
  const usingData = state.page === 'keyword' ? data[index] : data[0];
  return (
    <Container type={state.page}>
      {state.page === 'keyword' && (
        <TitleContainer>
          <Title>{usingData.chartType}</Title>
          <Title>TOP 10</Title>
        </TitleContainer>
      )}
      {usingData.keyword.map((keyword, index) => (
        <KeywordChartContainer type={state.page} key={index}>
          <Rank>{index + 1}</Rank>
          <KeywordContainer>
            <Keyword> {keyword.name}</Keyword>
          </KeywordContainer>
        </KeywordChartContainer>
      ))}
    </Container>
  );
}

export default connector(KeywordChart);
