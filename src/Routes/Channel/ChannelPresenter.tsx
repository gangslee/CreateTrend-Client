import React from 'react';
import styled from 'styled-components';

import Tab from '../../Components/Container/Tab';
import KeywordChart from '../../Components/Charts/KeywordChart';
import TextContainer from '../../Components/Container/TextContainer';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import VideoList from '../../Components/Lists/VideoList';

const Container = styled.div`
  width: 1040px;
  margin: 50px auto;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 25%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 73%;
  border: 1px solid #ddd;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const SubResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48%;
`;

const WordmapContainer = styled.div`
  width: 70%;
  /* box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3); */
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
      <KeywordContainer>
        <ChartContainer>
          <Tab type="chart" stateFunc={funcs.chart} />
          <KeywordChart stateFunc={funcs.keyword} />
        </ChartContainer>
        <ResultContainer>
          <SubResultContainer>
            <TextContainer type="popular" />
            <WordmapContainer>
              <Wordmap type="channel" />
            </WordmapContainer>
          </SubResultContainer>
          <SubResultContainer>
            <LineChart type="channel" />
          </SubResultContainer>
        </ResultContainer>
      </KeywordContainer>
      <VideoList mode="analysis" type="channel" />
    </Container>
  ) : (
    <div>123</div>
  );
}

export default ChannelPresenter;
