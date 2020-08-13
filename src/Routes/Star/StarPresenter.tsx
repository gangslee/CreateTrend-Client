import React from 'react';
import styled from 'styled-components';
import ChannelInfo from '../../Components/Container/ChannelInfo';

const Container = styled.div`
  width: 1040px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 50px auto;
`;

const AnalysisSection = styled.div`
  width: 700px;
`;

const VideoSection = styled.div`
  width: 290px;
  border: 1px solid #ddd;
  height: 1000px;
`;

interface IStarPresenterProps {
  loading: boolean;
}

function StarPresenter({loading}: IStarPresenterProps) {
  return loading ? (
    <Container>
      <AnalysisSection>
        <ChannelInfo />
      </AnalysisSection>
      <VideoSection></VideoSection>
    </Container>
  ) : (
    <h1>NOT YET</h1>
  );
}

export default StarPresenter;