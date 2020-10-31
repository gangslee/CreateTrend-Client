import React from 'react';
import styled, { css } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { Helmet } from 'react-helmet';

import Loader from '../../Components/Container/Loader';
import VideoList from '../../Components/Lists/VideoList';
import PieChart from '../../Components/Charts/PieChart';
import LineChart from '../../Components/Charts/LineChart';
import { RootState } from '../../store/store';
import { BGSecond } from '../../Components/Container/BGContiner';
import NoticeTooltip from '../../Components/Container/NoticeTooltip';
import SearchBar from '../../Components/Container/SearchBar';
import Wordmap from '../../Components/Charts/Wordmap';

const TEN_THOUSANDS = 10000;
const HUNDREAD_MILLIONS: number = 100000000;
const REGEX = /\B(?=(\d{3})+(?!\d))/g;

const Container = styled.div`
  width: 1220px;
  margin: 50px auto;
  box-sizing: border-box;
  padding-top: 10px;
`;

const SForm = styled.form`
  margin: 50px 0px;
  display: flex;
  justify-content: center;
`;

const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin: 30px 0px;
`;

const SloganRed = styled.span`
  color: #dd0909;
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
  height: 750px;
`;

const AnalysisSection = styled.div`
  width: 790px;
  display: inline-block;
  height: 100%;
`;

const BottomAnalysisSection = styled.div`
  width: 790px;
  display: inline-block;
`;

const AsideSection = styled.div`
  width: 380px;
  display: inline-block;
`;

const ChannelContainer = styled.div`
  padding: 30px 20px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  box-sizing: border-box;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
  color: #333;
  margin-bottom: 30px;
  margin-right: 10px;
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
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #f6f7fb;
  padding: 25px 40px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  line-height: 1.67;
  margin: 25px 0px;
  min-height: 120px;
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
  background-color: #fff;
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

const WordMapHeightContainer = styled.div`
  height: 290px;
  background-color: #fff;
  margin-top: -30px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 40px auto;
  padding: 20px 0px;
  border-bottom: 1px solid #dbe0f5;
`;

const Title = styled.span`
  font-size: 25px;
  color: #333;
  line-height: 1.4;
  margin-right: 10px;
`;

const TitleRed = styled.span`
  color: #d10909;
`;

const GraphContainer = styled.div`
  height: 520px;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 40px;
  background-color: #fff;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LineChartContainer = styled.div`
  height: 400px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PieSection = styled.div`
  height: 260px;
  padding: 20px 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #fff;
`;

interface IVideoProps {
  mode: string;
}

const VideoContainer = styled.div<IVideoProps>`
  height: ${({ mode }) => (mode === 'analysis' ? '260px' : '100%')};
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: 30px 25px;
  ${({ mode }) =>
    mode === 'aside' &&
    css`
      width: 380px;
      height: 100%;
    `};
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state: RootState) {
  return {
    states: { star: state.star, period: state.period },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IStarPresenterProps extends Props {
  id: string;
  channel: string;
  period: string;
  periodLine: (id: string, start: string, end: string) => void;
  searchKeyword: () => void;
}

function StarPresenter({
  states,
  id,
  channel,
  period,
  periodLine,
  searchKeyword,
}: IStarPresenterProps) {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  };

  return (
    <>
      <Helmet
        title={`Create Trend ㅣ ${channel}`}
        link={[{ rel: 'icon', type: 'image/png', href: 'symbol.png' }]}
      />
      <BGSecond>
        <Container>
          <Slogan>
            "<SloganRed>{channel}</SloganRed> 채널을 알아보아요"
          </Slogan>

          <SForm onSubmit={handleOnSubmit}>
            <SearchBar searchKeyword={searchKeyword} />
          </SForm>

          <ChannelName>{channel}</ChannelName>
          <SearchPeriod>검색기간 :{` ${states.period.start} ~ ${states.period.end}`}</SearchPeriod>

          <ResultContainer>
            <AnalysisSection>
              <ChannelContainer>
                {states.star.isLoading ? (
                  <LoaderContainer>
                    <Loader />
                  </LoaderContainer>
                ) : (
                  <>
                    <Subtitle>채널 소개</Subtitle>
                    <NoticeTooltip text={`'${channel}' 채널의 간략 정보를 확인해보세요! `} />
                    <ChannelInfoContainer>
                      <Avatar src={states.star.channelInfo.thumbnail_url} />
                      <InfoContainer>
                        <InfoTitle>채널명</InfoTitle>
                        <InfoItem>{channel}</InfoItem>
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
                            ? `${(states.star.channelInfo.subscriber / TEN_THOUSANDS).toFixed(
                                1
                              )}만명`
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
                        <NoticeTooltip
                          text={`'${channel}' 채널의 최근 영상들의 주 콘텐츠 분포를 확인해보세요! `}
                        />
                        <PieChartContainer>
                          <PieChart type="star" />
                        </PieChartContainer>
                      </PieContainer>
                      <WordMapContainer>
                        <Subtitle>채널 워드맵</Subtitle>
                        <NoticeTooltip
                          text={`'${channel}' 채널의 최근 영상들의 주 콘텐츠들을 확인해보세요! `}
                        />
                        <WordMapHeightContainer>
                          <Wordmap type="star"></Wordmap>
                        </WordMapHeightContainer>
                      </WordMapContainer>
                    </ChannelInfoContainer>
                  </>
                )}
              </ChannelContainer>
            </AnalysisSection>

            <VideoContainer mode="aside">
              {states.star.isLoading ? (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              ) : (
                <>
                  <Subtitle>채널 최고 조회수 영상</Subtitle>
                  <NoticeTooltip text={`'${channel}' 채널의 인기 영상들을 확인해보세요!`} />
                  <VideoList mode="aside" type="star" title={channel} />
                </>
              )}
            </VideoContainer>
          </ResultContainer>

          <TitleContainer>
            <Title>{!states.star.isLoading && <TitleRed>{channel}</TitleRed>} 구독자수 추이</Title>
            <NoticeTooltip
              text={`최근 8주간 '${
                !states.star.isLoading && channel
              }' 채널의 구독자수 추이 변화를 확인해보세요!\n 차트를 드래그하면 기간을 설정도 가능해요!`}
            />
          </TitleContainer>

          <GraphContainer>
            <RightContainer>
              <SearchPeriod>{`${states.period.start} ~ ${states.period.end}`}</SearchPeriod>
            </RightContainer>
            <LineChartContainer>
              {states.star.isLoading ? (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              ) : (
                <LineChart type="star" stateFunc={periodLine} id={id} />
              )}
            </LineChartContainer>
          </GraphContainer>

          <BottomSection>
            <BottomAnalysisSection>
              <Subtitle>
                기간 내 <TitleRed>조회수 급상승 영상</TitleRed>
              </Subtitle>
              <NoticeTooltip
                text={`설정하신 기간 동안의 '${
                  !states.star.isLoading && channel
                }' 채널의 가장 조회수 상승률이 높은 영상들을 확인해보세요!`}
              />
              <VideoContainer mode="analysis">
                {states.star.isLoading ? (
                  <LoaderContainer>
                    <Loader />
                  </LoaderContainer>
                ) : (
                  <>
                    <VideoList mode="analysis" type="star" title={period} />
                  </>
                )}
              </VideoContainer>
            </BottomAnalysisSection>
            <AsideSection>
              <Subtitle>
                기간 내 <TitleRed>콘텐츠 분포도</TitleRed>
              </Subtitle>
              <NoticeTooltip
                text={`설정하신 기간 동안의 '${
                  !states.star.isLoading && channel
                }' 채널 영상들의 주 콘텐츠들을 확인해보세요!`}
              />
              <PieSection>
                {states.period.isLoading ? (
                  <LoaderContainer>
                    <Loader />
                  </LoaderContainer>
                ) : (
                  <>
                    <PieChart type="period" />
                  </>
                )}
              </PieSection>
            </AsideSection>
          </BottomSection>
        </Container>
      </BGSecond>
    </>
  );
}

export default connector(StarPresenter);
