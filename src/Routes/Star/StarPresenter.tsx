import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import ChannelInfo from '../../Components/Container/ChannelInfo';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
import LineChart from '../../Components/Charts/LineChart';
import {RootState} from '../../store';

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

const ChannelContainer = styled.div`
  height: 200px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const ChartSection = styled.div`
  width: 100%;
  height: 300px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
`;

interface IVideoProps {
  mode: string;
}

const VideoContainer = styled.div`
  height: ${({mode}: IVideoProps) => (mode === 'analysis' ? '200px' : '580px')};
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 40px;
  ${({mode}: IVideoProps) =>
    mode === 'aside' &&
    css`
      width: 290px;
    `};
`;

function mapStateToProps(state: RootState) {
  return {
    data: {star: state.star, period: state.period},
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IStarPresenterProps extends Props {
  funcs: {
    starPie: (n: number) => void;
    periodLine: (id: string, start: string, end: string) => void;
  };
  id: string;
  period: string;
}

function StarPresenter({funcs, id, period, data}: IStarPresenterProps) {
  return (
    <Container>
      <AnalysisSection>
        <ChannelContainer>
          {data.star.channelInfo != null ? <ChannelInfo /> : <Loader />}
        </ChannelContainer>
        <ChartSection>
          {data.star.channelInfo != null ? (
            <PieChart
              stateFunc={funcs.starPie}
              type="star"
              title={data.star.channelInfo.channel_name}
            />
          ) : (
            <Loader />
          )}
        </ChartSection>
        <ChartSection>
          {data.star.channelInfo != null ? (
            <LineChart
              type="star"
              stateFunc={funcs.periodLine}
              id={id}
              title={data.star.channelInfo.channel_name}
            />
          ) : (
            <Loader />
          )}
        </ChartSection>
        <VideoContainer mode="analysis">
          {data.period.video != null ? (
            <VideoList mode="analysis" type="star" title={period} />
          ) : (
            <Loader />
          )}
        </VideoContainer>
        <ChartSection>
          {data.period.video != null ? (
            <PieChart stateFunc={funcs.starPie} type="period" title={period} />
          ) : (
            <Loader />
          )}
        </ChartSection>
      </AnalysisSection>
      <VideoContainer mode="aside">
        {data.period.video != null ? (
          <VideoList mode="aside" type="star" title={data.star.channelInfo.channel_name} />
        ) : (
          <Loader />
        )}
      </VideoContainer>
    </Container>
  );
}

export default connector(StarPresenter);
