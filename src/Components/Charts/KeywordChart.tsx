import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

const Container = styled.div`
  width: 330px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
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
  margin: 10px 0px;
  padding: 5px 10px;
  font-size: 16px;
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

const Keyword = styled.div`
  display: inline-block;
  width: 89%;
  text-align: center;
`;

function mapStateToProps(state: RootState) {
  return {data: state.keyword.keyword};
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IKeywordChartProps extends Props {
  index?: number;
}

function KeywordChart({data, index}: IKeywordChartProps) {
  console.log(data);
  const usingData = index ? data[index] : data[0];
  return (
    <Container>
      <TitleContainer>
        <Title>{usingData.name}</Title>
        <Title>TOP 10</Title>
      </TitleContainer>
      {usingData.data.map((keyword, index) => (
        <KeywordChartContainer key={index}>
          <Rank>{index + 1}</Rank>
          <Keyword> {keyword}</Keyword>
        </KeywordChartContainer>
      ))}
    </Container>
  );
}

export default connector(KeywordChart);
