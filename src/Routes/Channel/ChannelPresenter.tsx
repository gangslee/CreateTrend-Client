import React from 'react';
import styled from 'styled-components';

import Tab from '../../Components/Container/Tab';
import KeywordChart from '../../Components/Charts/KeywordChart';

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
          <KeywordChart />
        </ChartContainer>
        <ResultContainer></ResultContainer>
      </KeywordContainer>
    </Container>
  ) : (
    <div>123</div>
  );
}

export default ChannelPresenter;
