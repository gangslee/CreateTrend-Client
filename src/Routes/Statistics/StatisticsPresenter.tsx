import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Tab from '../../Components/Container/Tab';
import Loader from '../../Components/Container/Loader';
import KeywordChart from '../../Components/Charts/KeywordChart';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootDispatch, RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';
import SearchBar from '../../Components/Container/SearchBar';
import NoticeTooltip from '../../Components/Container/NoticeTooltip';
import { chartStateUpdate, keywordStateUpdate } from '../../store/reducers/statistics';

const MainTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 80px;
`;

const MainTitle = styled.span`
  display: inline-block;
  font-size: 45px;
  font-family: 'Lato';
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #222;
`;

const MainTitleRed = styled.span`
  color: #d10909;
`;

const MainSubtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-4Regular';
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #222;
  margin-top: 20px;
`;

const SForm = styled.form`
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1200px;
  margin: 50px auto;
  padding-bottom:50px;
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
  padding: 25px;
  background-color: white;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  margin-top: 40px;
  padding: 20px 0px;
`;

const Title = styled.span`
  font-size: 25px;
  color: #333;
  line-height: 1.4;
  margin-right: 10px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 22px;
  line-height: 1.36;
  :nth-child(2) {
    margin-bottom: 10px;
  }
  margin-right: 10px;
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
  height: 280px;
  :not(:last-child) {
    margin-bottom: 30px;
  }
  :last-child {
    margin-top: 10px;
  }
`;

const CircleContainer = styled.div`
  width: 29%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 35px;
`;

const PopularText = styled.span`
  font-family: 'S-CoreDream-4Regular';
  font-size: 20px;
  line-height: 1.4;
  color: #999;
  display: inline-block;
  margin-bottom: 10px;
`;

const SCircle = styled(CircularProgressbar)`
  width: 170px;
  height: 170px;
`;

const WordmapContainer = styled.div`
  width: 70%;
  height: 100%;
  box-sizing: border-box;
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
`;

function mapStateToProps(state: RootState) {
  return {
    states:{
      data: state.statistics,
    }
  };
}

function mapDispatchToProps(dispatch:RootDispatch){
  return{
    dispatches:{
      chart: () => {
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(keywordStateUpdate(n));
      },
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IStatisticsPresenterProps extends Props {
  searchKeyword: () => void;
}

function StatisticsPresenter({states,dispatches, searchKeyword}: IStatisticsPresenterProps) {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  };
  const title =
    states.data.keywordChart && states.data.keywordChart[states.data.currentChart].keyword[states.data.currentKeyword].name;
  return (
    <BGSecond>
      <MainTitleContainer>
        <MainTitle>
          <MainTitleRed>Youtube</MainTitleRed> AI assistant
        </MainTitle>
        <MainSubtitle>AI가 현재의 당신 채널을 분석하고 개선방향을 찾아드립니다.</MainSubtitle>
      </MainTitleContainer>

      <SForm onSubmit={handleOnSubmit}>
        <SearchBar searchKeyword={searchKeyword} />
      </SForm>

      <Container>
        <KeywordContainer>
          <ChartContainer>
            <TabContainer>
              <Tab type="chart" stateFunc={dispatches.chart} />
            </TabContainer>
            <KeywordChartContainer>
              {states.data.isLoadingChart ?  (
                <Loader />
              ):(
                <KeywordChart stateFunc={dispatches.keyword} type="statistics" />
              )}
            </KeywordChartContainer>
          </ChartContainer>
          <ResultContainer>
            {states.data.isLoadingData ? (
              <Loader />
            ):(
              <>
                <Subtitle>
                  <TitleRed>{title}</TitleRed> 인기도 & 워드맵
                </Subtitle>
                <NoticeTooltip text={`한 달간 '${title}' 콘텐츠의 평균 인기도와 연관 콘텐츠들을 확인해보세요! `} />
                <SubResultContainer>
                  <CircleContainer>
                    <PopularText>평균 인기도</PopularText>
                    <SCircle
                      value={
                        states.data.keywordChart[states.data.currentChart].keyword[states.data.currentKeyword].popular
                      }
                      text={`${
                        states.data.keywordChart[states.data.currentChart].keyword[states.data.currentKeyword].popular
                      }%`}
                      styles={buildStyles({
                        pathColor: '#d10909',
                        textColor: '#222',
                      })}
                    />
                  </CircleContainer>
                  <WordmapContainer>
                    <Wordmap type="statistics" />
                  </WordmapContainer>
                </SubResultContainer>
                <Subtitle>
                  <TitleRed>{title}</TitleRed> 인기도 추이
                </Subtitle>
                <NoticeTooltip text={`한 달간 '${title}' 콘텐츠의 인기도 변화 추이를 확인해보세요! `} />
                <SubResultContainer>
                  <LineChartContainer>
                    <LineChart type="statistics" />
                  </LineChartContainer>
                </SubResultContainer>
              </>
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
          <Title>
            <TitleRed>{title}</TitleRed> 조회수 급상승 영상
          </Title>
          <NoticeTooltip text={`'${title}'을 콘텐츠로한 조회수 급상승 영상들을 확인해보세요! `} />
        </TitleContainer>
          {states.data.isLoadingData ?  (
            <Loader />
          ):(
            <VideoList mode="analysis" type="statistics" title={title} />
          )}
      </Container>
    </BGSecond>
  );
}

export default connector(StatisticsPresenter);
