import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 75px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

interface ITabContainerProps {
  current: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const TabContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${({current}: ITabContainerProps) => (current ? '#fff9eb' : '#fff')};
  color: ${({current}: ITabContainerProps) => (current ? '#feb100' : '#ccc')};
  :first-child {
    border-right: 1px solid #ddd;
  }
`;

const TabTitle = styled.span`
  display: inline-flex;
  height: 30px;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`;

function mapStateToProps(state: RootState) {
  return {
    state: {
      now: state.channel.channel,
      channel: state.channel.currentChannel,
      chart: state.channel.currentChart,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ITabProps extends Props {
  type: string;
  stateFunc: () => void;
}

function Tab({state, stateFunc, type}: ITabProps) {
  const channelType = state.channel;
  const chartType = state.chart;
  const currentType =
    type === 'channel'
      ? state.now[channelType].channelType
      : state.now[channelType].keywordChart[chartType].chartType;

  const handleOnClickChannel = (e: React.MouseEvent) => {
    if (e.currentTarget.innerHTML !== currentType) {
      stateFunc();
    }
  };

  return (
    <Container>
      <TabContainer current={currentType === 'MY'} onClick={handleOnClickChannel}>
        <TabTitle>MY</TabTitle>
      </TabContainer>
      <TabContainer current={currentType === 'ALL'} onClick={handleOnClickChannel}>
        <TabTitle>ALL</TabTitle>
      </TabContainer>
    </Container>
  );
}

export default connector(Tab);
