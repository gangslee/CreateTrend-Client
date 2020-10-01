import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import ChannelInfo from '../../Components/Container/ChannelInfo';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
import LineChart from '../../Components/Charts/LineChart';
import {RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';

const Container = styled.div`
  width: 1220px;
  margin: 50px auto;
  box-sizing: border-box;
  padding-top: 10px;
`;

const ChannelName = styled.span`
  font-size: 35px;
  line-height: 1.4;
`;

const SearchPeriod = styled.div`
  font-family: 'S-CoreDream-4Regular';
  font-size: 18px;
  line-height: 1.39;
  color: #999;
  margin: 20px 0px;
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const AnalysisSection = styled.div`
  width: 790px;
`;

const ChannelContainer = styled.div`
  height: 725px;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
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

const VideoContainer = styled.div<IVideoProps>`
  height: ${({mode}) => (mode === 'analysis' ? '200px' : '725px')};
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: 30px 25px;
  margin-bottom: 40px;
  ${({mode}) =>
    mode === 'aside' &&
    css`
      width: 380px;
    `};
`;

function mapStateToProps(state: RootState) {
  return {
    states: {star: state.star, period: state.period},
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

function StarPresenter({funcs, id, period, states}: IStarPresenterProps) {
  return (
    <BGSecond>
      <Container>
        {states.star.channelInfo && (
          <ChannelName>{states.star.channelInfo.channel_name}</ChannelName>
        )}

        <SearchPeriod>
          검색기간 : {states.period && `${states.period.start} ~ ${states.period.end}`}
        </SearchPeriod>

        <ResultContainer>
          <AnalysisSection>
            <ChannelContainer>
              {states.star.channelInfo != null ? <ChannelInfo /> : <Loader />}
            </ChannelContainer>
            <ChartSection>
              {states.star.channelInfo != null ? (
                <PieChart
                  stateFunc={funcs.starPie}
                  type="star"
                  title={states.star.channelInfo.channel_name}
                />
              ) : (
                <Loader />
              )}
            </ChartSection>
            <ChartSection>
              {states.star.channelInfo != null ? (
                <LineChart type="star" stateFunc={funcs.periodLine} id={id} />
              ) : (
                <Loader />
              )}
            </ChartSection>
            <VideoContainer mode="analysis">
              {states.period.video != null ? (
                <VideoList mode="analysis" type="star" title={period} />
              ) : (
                <Loader />
              )}
            </VideoContainer>
            <ChartSection>
              {states.period.video != null ? (
                <PieChart stateFunc={funcs.starPie} type="period" title={period} />
              ) : (
                <Loader />
              )}
            </ChartSection>
          </AnalysisSection>
          <VideoContainer mode="aside">
            {states.period.video != null ? (
              <VideoList mode="aside" type="star" title={states.star.channelInfo.channel_name} />
            ) : (
              <Loader />
            )}
          </VideoContainer>
        </ResultContainer>
      </Container>
    </BGSecond>
  );
}

export default connector(StarPresenter);
