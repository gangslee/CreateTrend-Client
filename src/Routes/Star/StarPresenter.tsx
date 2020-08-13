import React from 'react';
import styled from 'styled-components';
import ChannelInfo from '../../Components/Container/ChannelInfo';
import VideoList from '../../Components/Lists/VideoList';

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

const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  width: 47%;
  border: 1px solid #ddd;
`;

const VideoSection = styled.div`
  width: 290px;
`;

interface IStarPresenterProps {
  loading: boolean;
}

function StarPresenter({loading}: IStarPresenterProps) {
  return loading ? (
    <Container>
      <AnalysisSection>
        <ChannelInfo />
        <ChartSection>
          <ChartContainer></ChartContainer>
          <ChartContainer></ChartContainer>
        </ChartSection>
      </AnalysisSection>
      <VideoSection>
        <VideoList mode="aside" type="star" />
      </VideoSection>
    </Container>
  ) : (
    <h1>NOT YET</h1>
  );
}

export default StarPresenter;
