import React from 'react';
import styled from 'styled-components';

import Tab from '../../Components/Container/Tab';

const Container = styled.div`
  width: 1040px;
  margin: 50px auto;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 800px;
  border: 1px solid #aaa;
`;

const ChartContainer = styled.div`
  width: 35%;
  border: 1px solid #aaa;
`;

interface IChannelPresenterProps {
  loading: boolean;
  funcs: {
    channel: () => void;
  };
}

function ChannelPresenter({loading, funcs}: IChannelPresenterProps) {
  return loading ? (
    <Container>
      <Tab type="channel" stateFunc={funcs.channel} />

      <KeywordContainer>
        <ChartContainer>
          <Tab type="chart" stateFunc={funcs.channel} />
        </ChartContainer>
      </KeywordContainer>
    </Container>
  ) : (
    <div>123</div>
  );
}

export default ChannelPresenter;
