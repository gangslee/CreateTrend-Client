import React from 'react';
import styled from 'styled-components';

import ChannelInfo from '../../Components/Container/ChannelInfo';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';

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
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 47%;
`;

const LinechartContainer = styled.div`
  height: 300px;
`;

const VideoSection = styled.div`
  width: 290px;
`;

interface IStarPresenterProps {
  loading: boolean;
  funcs: {
    starPie: (n: number) => void;
  };
}

function StarPresenter({loading, funcs}: IStarPresenterProps) {
  return loading ? (
    <Container>
      <AnalysisSection>
        <ChannelInfo />
        <ChartSection>
          <ChartContainer>
            <PieChart stateFunc={funcs.starPie} />
          </ChartContainer>
          <ChartContainer>
            <Wordmap type="star" />
          </ChartContainer>
        </ChartSection>
        <LinechartContainer>
          <LineChart type="star" />
        </LinechartContainer>
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
