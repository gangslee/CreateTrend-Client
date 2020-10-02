import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
import LineChart from '../../Components/Charts/LineChart';
import {RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';

const TEN_THOUSANDS = 10000;
const HUNDREAD_MILLIONS: number = 100000000;
const REGEX = /\B(?=(\d{3})+(?!\d))/g;

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
  padding: 30px 20px;
  min-height: 750px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
  color: #333;
  margin-bottom: 30px;
`;

const ChannelInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 30px;
`;

const InfoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 1px;
  height: 45px;
  background-color: #dbe0f5;
  margin: 0px 30px;
`;

const InfoTitle = styled.span`
  font-family: 'S-CoreDream-4Regular';
  font-size: 13px;
  line-height: 2.69;
  color: #999;
`;

const InfoItem = styled.span`
  font-size: 20px;
  line-height: 1.75;
`;

const DescContainer = styled.div`
  border-radius: 10px;
  background-color: #f6f7fb;
  padding: 25px 40px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  line-height: 1.67;
  margin: 25px 0px;
`;

const PieContainer = styled.div`
  width: 300px;
  height: 350px;
  padding: 25px 30px;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 10px;
  border: solid 1px #dbe0f5;
  margin-right: 30px;
`;

const PieChartContainer = styled.div`
  height: 260px;
`;

const WordMapContainer = styled.div`
  width: 415px;
  height: 350px;
  padding: 25px 30px;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 10px;
  border: solid 1px #dbe0f5;
`;

const ChartSection = styled.div`
  width: 100%;
  height: 300px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 40px;
`;

interface IVideoProps {
  mode: string;
}

const VideoContainer = styled.div<IVideoProps>`
  height: ${({mode}) => (mode === 'analysis' ? '200px' : '750px')};
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
              <Subtitle>채널 소개</Subtitle>
              {states.star.channelInfo != null ? (
                <>
                  <ChannelInfoContainer>
                    <Avatar src={states.star.channelInfo.thumbnail_url} />
                    <InfoContainer>
                      <InfoTitle>채널명</InfoTitle>
                      <InfoItem>{states.star.channelInfo.channel_name}</InfoItem>
                    </InfoContainer>
                    <Divider />
                    <InfoContainer>
                      <InfoTitle>채널 개설일</InfoTitle>
                      <InfoItem>{states.star.channelInfo.channel_start_date}</InfoItem>
                    </InfoContainer>
                    <Divider />
                    <InfoContainer>
                      <InfoTitle>구독자수</InfoTitle>
                      <InfoItem>
                        {states.star.channelInfo.subscriber === 0
                          ? '비공개'
                          : states.star.channelInfo.subscriber >= HUNDREAD_MILLIONS
                          ? `${(states.star.channelInfo.subscriber / HUNDREAD_MILLIONS).toFixed(
                              1
                            )}억명`
                          : states.star.channelInfo.subscriber >= TEN_THOUSANDS
                          ? `${(states.star.channelInfo.subscriber / TEN_THOUSANDS).toFixed(1)}만명`
                          : `${states.star.channelInfo.subscriber
                              .toString()
                              .replace(REGEX, ',')}명`}
                      </InfoItem>
                    </InfoContainer>
                  </ChannelInfoContainer>
                  <DescContainer>{states.star.channelInfo.channel_description}</DescContainer>
                  <ChannelInfoContainer>
                    <PieContainer>
                      <Subtitle>콘텐츠 분포도</Subtitle>
                      <PieChartContainer>
                        <PieChart stateFunc={funcs.starPie} type="star" />
                      </PieChartContainer>
                    </PieContainer>
                    <WordMapContainer>
                      <Subtitle>채널 워드맵</Subtitle>
                    </WordMapContainer>
                  </ChannelInfoContainer>
                </>
              ) : (
                <Loader />
              )}
            </ChannelContainer>
          </AnalysisSection>
          <VideoContainer mode="aside">
            {states.period.video != null ? (
              <>
                <Subtitle>채널 최고 조회수 영상</Subtitle>
                <VideoList mode="aside" type="star" title={states.star.channelInfo.channel_name} />
              </>
            ) : (
              <Loader />
            )}
          </VideoContainer>
        </ResultContainer>
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
            <PieChart stateFunc={funcs.starPie} type="period" />
          ) : (
            <Loader />
          )}
        </ChartSection>
      </Container>
    </BGSecond>
  );
}

export default connector(StarPresenter);
