import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Helmet } from 'react-helmet';

import Tab from '../../Components/Container/Tab';
import Loader from '../../Components/Container/Loader';
import KeywordChart from '../../Components/Charts/KeywordChart';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import VideoList from '../../Components/Charts/VideoList';
import { BGSecond } from '../../Components/Container/BGContiner';
import SearchBar from '../../Components/Container/SearchBar';
import NoticeTooltip from '../../Components/Container/NoticeTooltip';
import Title from '../../Components/Text/Title';
import Red from '../../Components/Text/Red';
import { IProps, connector } from './connectors/presenter';

// 화면에 나타날 style을 포함한 Element들을 선언
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

const KeywordChartContainer = styled.div`
  height: 608px;
`;

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

const VideoContainer = styled.div`
  height: 300px;
`;

// 유튜브 통계 분석(메인) 페이지의 UI Logic Component 생성
function StatisticsPresenter({ states, dispatches, searchKeyword }: IProps) {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  }; // 검색 할 내용을 제출 시 실행되는 함수

  const title =
    states.data.keywordChart &&
    states.data.keywordChart[states.data.currentChart].keyword[states.data.currentKeyword].name; // 키워드 차트 로딩이 완료 된 경우 화면에 출력할 콘텐츠 명을 지정

  return (
    <>
      {/* react-helmet을 통해 웹 문서 header 편집*/}
      <Helmet
        title="Create Trend"
        link={[{ rel: 'icon', type: 'image/png', href: 'symbol.png' }]}
      />

      <BGSecond>
        {/* 서비스 제목 & 요약 설명*/}
        <MainTitleContainer>
          <MainTitle>
            <Red>Youtube</Red> AI assistant
          </MainTitle>
          <MainSubtitle>AI가 현재의 당신 채널을 분석하고 개선방향을 찾아드립니다.</MainSubtitle>
        </MainTitleContainer>

        {/* 검색 창*/}
        <SForm onSubmit={handleOnSubmit}>
          <SearchBar searchKeyword={searchKeyword} />
        </SForm>

        <Container>
          <KeywordContainer>
            {/* 키워드 차트*/}
            <ChartContainer>
              <TabContainer>
                <Tab type="chart" stateFunc={dispatches.chart} />
              </TabContainer>
              <KeywordChartContainer>
                {states.data.isLoadingChart ? (
                  <Loader />
                ) : (
                  <KeywordChart stateFunc={dispatches.keyword} type="statistics" />
                )}
              </KeywordChartContainer>
            </ChartContainer>

            {/* 키워드 분석 결과*/}
            <ResultContainer>
              {states.data.isLoadingData ? (
                <Loader />
              ) : (
                <>
                  <Subtitle>
                    <Red>{`${title} `}</Red> 인기도 & 워드맵
                  </Subtitle>
                  <NoticeTooltip
                    text={`한 달간 '${title}' 콘텐츠의 평균 인기도와 연관 콘텐츠들을 확인해보세요! `}
                  />

                  <SubResultContainer>
                    <CircleContainer>
                      {/* 선택 키워드 평균 인기도*/}
                      <PopularText>평균 인기도</PopularText>
                      <SCircle
                        value={
                          states.data.keywordChart[states.data.currentChart].keyword[
                            states.data.currentKeyword
                          ].popular
                        }
                        text={`${
                          states.data.keywordChart[states.data.currentChart].keyword[
                            states.data.currentKeyword
                          ].popular
                        }%`}
                        styles={buildStyles({
                          pathColor: '#d10909',
                          textColor: '#222',
                        })}
                      />
                    </CircleContainer>

                    {/* 선택 키워드 관련 키워드 WordMap*/}
                    <WordmapContainer>
                      <Wordmap type="statistics" />
                    </WordmapContainer>
                  </SubResultContainer>

                  <Subtitle>
                    <Red>{title}</Red>
                    {states.data.currentChart === 0 ? ' 인기도 추이' : ' 영상화 추이'}
                  </Subtitle>
                  <NoticeTooltip
                    text={`한 달간 '${title}' 콘텐츠의 ${
                      states.data.currentChart === 0 ? '인기도' : ' 영상화'
                    } 변화 추이를 확인해보세요! `}
                  />

                  {/* 선택 키워드 관련 키워드 인기도/영상화 추이 그래프*/}
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
              <Red>{title}</Red> 조회수 급상승 영상
            </Title>
            <NoticeTooltip text={`'${title}'을 콘텐츠로한 조회수 급상승 영상들을 확인해보세요! `} />
          </TitleContainer>

          {/* 선택 키워드 관련 조회수 급상승 영상 리스트*/}
          <VideoContainer>
            {states.data.isLoadingData ? (
              <Loader />
            ) : (
              <VideoList mode="analysis" type="statistics" title={title} />
            )}
          </VideoContainer>
        </Container>
      </BGSecond>
    </>
  );
}

export default connector(StatisticsPresenter);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
