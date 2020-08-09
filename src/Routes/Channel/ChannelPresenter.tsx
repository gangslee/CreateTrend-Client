import React from 'react';
import styled from 'styled-components';

import Tab from '../../Components/Container/Tab';
import KeywordChart from '../../Components/Charts/KeywordChart';
import TextContainer from '../../Components/Container/TextContainer';

const Container = styled.div`
  width: 1040px;
  margin: 50px auto;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const ResultContainer = styled.div`
  width: 65%;
  border: 1px solid #ddd;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 30px;
`;

const SubResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
`;

const WordmapContainer = styled.div`
  width: 70%;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

interface IChannelPresenterProps {
  loading: boolean;
  funcs: {
    channel: () => void;
    chart: () => void;
    keyword: (n: number) => void;
  };
}

function ChannelPresenter({loading, funcs}: IChannelPresenterProps) {
  return loading ? (
    <Container>
      <Tab type="channel" stateFunc={funcs.channel} />
      <KeywordContainer>
        <ChartContainer>
          <Tab type="chart" stateFunc={funcs.chart} />
          <KeywordChart stateFunc={funcs.keyword} />
        </ChartContainer>
        <ResultContainer>
          <SubResultContainer>
            <TextContainer type="popular" />
            <WordmapContainer></WordmapContainer>
          </SubResultContainer>
          <SubResultContainer></SubResultContainer>
        </ResultContainer>
      </KeywordContainer>
    </Container>
  ) : (
    <div>123</div>
  );
}

export default ChannelPresenter;
