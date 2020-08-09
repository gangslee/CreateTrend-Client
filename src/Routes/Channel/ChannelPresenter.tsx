import React from 'react';
import styled from 'styled-components';

import Tab from '../../Components/Container/Tab';

const Container = styled.div`
  width: 1040px;
  margin: 50px auto;
`;

const TabContainer = styled.div`
  height: 75px;
  margin-bottom: 30px;
  border: 1px solid #aaa;
`;

const ResultContainer = styled.div`
  height: 800px;
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
      {/* <TabContainer> */}
      <Tab type="channel" stateFunc={funcs.channel} />
      {/* </TabContainer> */}
      <ResultContainer></ResultContainer>
    </Container>
  ) : (
    <div>123</div>
  );
}

export default ChannelPresenter;
