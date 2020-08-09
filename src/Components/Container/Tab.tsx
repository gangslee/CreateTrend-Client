import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store";

const Container = styled.div`
  height: 75px;
  margin-bottom: 30px;
  border: 1px solid #aaa;
`;

const TabContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 2rem;
`;

function mapStateToProps(state: RootState) {
  return {
    channel: state.channel.currentChannel,
    chart: state.channel.currentChart,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ITabProps extends Props {
  type: string;
}

function Tab({ channel, chart, type }: ITabProps) {
  const usingType = type === "channel" ? channel : chart;
  console.log(usingType);
  return (
    <Container>
      <TabContainer>MY</TabContainer>
      <TabContainer>ALL</TabContainer>
    </Container>
  );
}

export default connector(Tab);
