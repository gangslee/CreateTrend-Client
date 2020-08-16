import React from 'react';
import styled from 'styled-components';

import ChannelInfo from '../../Components/Container/ChannelInfo';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
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

// const ChartContainer = styled.div`
//   width: 47%;
// `;

const LinechartContainer = styled.div`
  height: 300px;
  margin-bottom: 30px;
`;

const VideoSection = styled.div`
  width: 290px;
`;

interface IStarPresenterProps {
  funcs: {
    starPie: (n: number) => void;
    periodLine: (id: string, start: string, end: string) => void;
  };
  id: string;
  title: string;
}

function StarPresenter({funcs, id, title}: IStarPresenterProps) {
  return (
    <Container>
      <AnalysisSection>
        <ChannelInfo />
        <ChartSection>
          <PieChart stateFunc={funcs.starPie} type="star" />
        </ChartSection>
        <LinechartContainer>
          <LineChart type="star" stateFunc={funcs.periodLine} id={id} />
        </LinechartContainer>
        {/* <VideoList mode="analysis" type="star" /> */}
        <ChartSection>
          <PieChart stateFunc={funcs.starPie} type="period" />
        </ChartSection>
      </AnalysisSection>

      <VideoSection>
        <VideoList mode="aside" type="star" />
      </VideoSection>
    </Container>
  );
}

export default StarPresenter;
