import React from "react";
import styled from "styled-components";

interface IChannelPresenterProps {
  loading: boolean;
}

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

export default function ChannelPresenter({ loading }: IChannelPresenterProps) {
  return loading ? (
    <Container>
      <TabContainer></TabContainer>
      <ResultContainer></ResultContainer>
    </Container>
  ) : (
    <div>123</div>
  );
}
