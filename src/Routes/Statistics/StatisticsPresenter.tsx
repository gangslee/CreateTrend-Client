import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Tab from '../../Components/Container/Tab';
import Loader from '../../Components/Container/Loader';
import KeywordChart from '../../Components/Charts/KeywordChart';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';

const Container = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  height: 700px;
`;

const ChartContainer = styled.div`
  width: 330px;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
`;

const TabContainer = styled.div`
  height: 60px;
  font-size: 20px;
  margin-bottom: 20px;
`;

const KeywordChartContainer = styled.div``;

const ResultContainer = styled.div`
  width: 840px;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: 30px 25px;
  background-color: white;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  margin-top: 40px;
  padding: 20px 0px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 22px;
  line-height: 1.36;
  margin-right: 10px;
  :not(:last-child) {
    margin-bottom: 20px;z
  }
`;

const TitleRed = styled.span`
  color: #d10909;
`;

const TitleIcon = styled.img`
  width: 35px;
  height: 37px;
  margin-right: 15px;
`;

const SubResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 260px;
  :not(:last-child) {
    margin-bottom: 30px;
  }
`;

const WordmapContainer = styled.div`
  width: 500px;
  height: 100%;
  box-sizing: border-box;

  padding: 10px;
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

const VideoContainer = styled.div`
  height: 300px;
  box-sizing: border-box;
  border: 2px solid #ecf1ff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state: RootState) {
  return {
    data: state.statistics,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IChannelPresenterProps extends Props {
  title: string | null;
  funcs: {
    chart: () => void;
    keyword: (n: number) => void;
  };
}

function ChannelPresenter({funcs, title, data}: IChannelPresenterProps) {
  return (
    <BGSecond>
      <Container>
        <KeywordContainer>
          <ChartContainer>
            <TabContainer>
              <Tab type="chart" stateFunc={funcs.chart} />
            </TabContainer>
            <KeywordChartContainer>
              {data.keywordChart !== null ? (
                <KeywordChart stateFunc={funcs.keyword} type="statistics" />
              ) : (
                <Loader />
              )}
            </KeywordChartContainer>
          </ChartContainer>
          <ResultContainer>
            {data.keywordChart !== null &&
            data.keywordChart[data.currentChart].keyword[data.currentKeyword] !== undefined &&
            data.keywordChart[data.currentChart].keyword[data.currentKeyword].wordmap !==
              undefined &&
            data.keywordChart[data.currentChart].keyword[data.currentKeyword].popular !==
              undefined &&
            data.keywordChart[data.currentChart].keyword[data.currentKeyword].line !== undefined ? (
              <>
                <Subtitle>
                  <TitleRed>{title}</TitleRed> 인기도 & 워드맵
                </Subtitle>
                <SubResultContainer>
                  <WordmapContainer>
                    <Wordmap type="statistics" />
                  </WordmapContainer>
                </SubResultContainer>
                <Subtitle>
                  <TitleRed>{title}</TitleRed> 인기도 추이
                </Subtitle>
                <SubResultContainer>
                  <LineChartContainer>
                    <LineChart type="statistics" />
                  </LineChartContainer>
                </SubResultContainer>
              </>
            ) : (
              <Loader />
            )}
          </ResultContainer>
        </KeywordContainer>
        <TitleContainer>
          <TitleIcon
            src={require('../../Asset/images/youtubeIcon.png')}
            srcSet={
              (require('../../Asset/images/youtubeIcon@2x.png'),
              require('../../Asset/images/youtubeIcon@3x.png'))
            }
          />
          <Subtitle>
            <TitleRed>{title}</TitleRed> 조회수 급상승 영상
          </Subtitle>
        </TitleContainer>
        <VideoContainer>
          {data.keywordChart !== null &&
          data.keywordChart[data.currentChart].keyword[data.currentKeyword] !== undefined &&
          data.keywordChart[data.currentChart].keyword[data.currentKeyword].video !== undefined ? (
            <VideoList mode="analysis" type="statistics" title={title} />
          ) : (
            <Loader />
          )}
        </VideoContainer>
      </Container>
    </BGSecond>
  );
}

export default connector(ChannelPresenter);
