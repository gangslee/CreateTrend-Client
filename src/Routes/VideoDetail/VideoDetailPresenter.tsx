import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { BGSecond } from "../../Components/Container/BGContiner";
import LineChart from "../../Components/Charts/LineChart";
import Loader from "../../Components/Container/Loader";
import Red from "../../Components/Text/Red";
import Slogan from "../../Components/Text/Slogan";
import { IProps, connector } from "./connectors/presenter";

const REGEX = /\B(?=(\d{3})+(?!\d))/g; // 숫자 표기에 사용되는 정규식

// 화면에 나타날 style을 포함한 Element들을 선언
const Container = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

const SloganContainer = styled.div`
  margin-top: 90px;
  margin-bottom: 30px;
`;

const VideoTitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
  margin-top: 50px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 270px;
  margin-top: 20px;
`;

const ThumbnailContainer = styled.a`
  display: inline-block;
  width: 440px;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  &:hover {
    filter: brightness(80%);
  }
  transition: filter 0.3s linear, background-image 0.3s linear;
  border-radius: 5px;
`;

const VideoInfo = styled.div`
  width: 720px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
  padding: 0px 30px;
`;

const VideoInfoRow = styled.div`
  display: flex;
  align-items: center;
  :first-child {
    margin-top: 20px;
  }
`;

const Avatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 25px;
`;

const ChannelName = styled.span`
  font-size: 18px;
  line-height: 1.39;
`;

const Desc = styled.span`
  font-size: 18px;
  font-family: "S-CoreDream-4Regular";
  line-height: 1.6;
  margin: 20px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Keyword = styled.a`
  display: inline-block;
  font-family: "S-CoreDream-4Regular";
  font-size: 12px;
  border-radius: 10px;
  padding: 8px 12px;
  background-color: #dee0eb;
  :not(:last-child) {
    margin-right: 12px;
  }
  :hover {
    color: #d10909;
  }
`;

const LikeDisLike = styled.div`
  border-top: 1px solid #dbe0f5;
  margin-top: 20px;
  height: 80px;
`;

const LikeContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 100%;
  :last-child {
    border-left: 1px solid #dbe0f5;
  }
`;

const InfoTitle = styled.span`
  font-family: "S-CoreDream-4Regular";
  font-size: 20px;
  line-height: 1.4;
  color: #999;
`;

const InfoPercent = styled.span`
  font-family: "Noto Sans KR";
  font-weight: 600;
  font-size: 30px;
  line-height: 1.5;
  margin-left: 25px;
`;

const Subtitle = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 25px;
  line-height: 1.4;
  padding-bottom: 15px;
`;

const ChartContainer = styled.div`
  height: 600px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
  padding: 0px 35px;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SearchPeriod = styled.div`
  font-family: "S-CoreDream-4Regular";
  font-size: 18px;
  line-height: 1.39;
  color: #999;
  margin: 30px 0px;
`;

const LineChartContainer = styled.div`
  height: 400px;
  margin-top: 15px;
`;

const Rise = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 10px;
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 영상 상세 분석 페이지의 UI Logic Component 생성
function VideoDetailPresenter({ states, title }: IProps) {
  return (
    <>
      {/* react-helmet을 통해 웹 문서 header 편집*/}
      <Helmet
        title={`Create Trend ㅣ영상 상세 분석 : ${title}`}
        link={[{ rel: "icon", type: "image/png", href: "symbol.png" }]}
      />

      <BGSecond>
        <Container>
          {/* 상단 slogan*/}
          <SloganContainer>
            <Slogan>
              "영상 상세 분석을 통해 영상에 대한 보다{" "}
              <Red>자세한 분석 결과</Red>를 확인해보세요"
            </Slogan>
          </SloganContainer>

          {/* 영상 썸네일 & 채널 정보*/}
          <VideoTitle>{title}</VideoTitle>
          <InfoContainer>
            <ThumbnailContainer
              href={
                !states.data.isLoading &&
                `https://www.youtube.com/watch?v=${states.data.video.video.video_id}`
              }
              target="_blank"
            >
              {states.data.isLoading ? (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              ) : (
                <Thumbnail src={states.data.video.video.thumbnail_url} />
              )}
            </ThumbnailContainer>
            <VideoInfo>
              {states.data.isLoading ? (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              ) : (
                <>
                  <VideoInfoRow>
                    <Avatar src={states.data.channel.thumbnail_url} />
                    <ChannelName>
                      {states.data.channel.channel_name}
                    </ChannelName>
                  </VideoInfoRow>
                  <Desc>{states.data.channel.channel_description}</Desc>
                  <VideoInfoRow>
                    {states.data.video.video.videokeywordnew
                      .slice(0, 5)
                      .map((word, index) => (
                        <Keyword
                          key={index}
                          href={`/keyword/${encodeURIComponent(word.keyword)}`}
                          target="_blank"
                        >
                          {word.keyword}
                        </Keyword>
                      ))}
                  </VideoInfoRow>
                  <LikeDisLike>
                    <LikeContainer>
                      <InfoTitle>좋아요</InfoTitle>
                      <InfoPercent>
                        {states.data.video.video.videolikes.length === 0
                          ? "비공개"
                          : `${states.data.video.video.videolikes[0].likes.toFixed(
                              0
                            )}`.replace(REGEX, ",")}
                      </InfoPercent>
                    </LikeContainer>
                    <LikeContainer>
                      <InfoTitle>싫어요</InfoTitle>
                      <InfoPercent>
                        {states.data.video.video.videolikes.length === 0
                          ? "비공개"
                          : `${states.data.video.video.videolikes[0].dislikes.toFixed(
                              0
                            )}`.replace(REGEX, ",")}
                      </InfoPercent>
                    </LikeContainer>
                  </LikeDisLike>
                </>
              )}
            </VideoInfo>
          </InfoContainer>

          {/* 조회수 추이 그래프*/}
          <Subtitle>
            <Red>조회수</Red> 추이 그래프
          </Subtitle>
          <ChartContainer>
            {states.data.isLoading ? (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            ) : (
              <>
                <Right>
                  {
                    <SearchPeriod>{`${states.data.lines[0].data[0].date} ~ ${
                      states.data.lines[0].data[
                        states.data.lines[0].data.length - 1
                      ].date
                    }`}</SearchPeriod>
                  }
                </Right>
                <LineChartContainer>
                  <LineChart type="detail" />
                </LineChartContainer>
                <LikeDisLike>
                  <LikeContainer>
                    <InfoTitle>전체 평균 인기도 대비 영상 인기도</InfoTitle>
                    <InfoPercent>
                      {states.data.video.video_popularity
                        ? `${(
                            states.data.video.video_popularity /
                            states.data.video.avg_popularity
                          )
                            .toFixed(0)
                            .toString()
                            .replace(REGEX, ",")}% `
                        : "비공개"}
                    </InfoPercent>
                    {states.data.video.video_popularity /
                      states.data.video.avg_popularity >
                      0 && (
                      <Rise src={require("../../Asset/images/Rise_icon.svg")} />
                    )}
                  </LikeContainer>
                  <LikeContainer>
                    <InfoTitle>전체 평균 조회수 대비 영상 조회수</InfoTitle>
                    <InfoPercent>
                      {states.data.video.video_views
                        ? `${(
                            states.data.video.video_views /
                            states.data.video.avg_videoviews
                          )
                            .toFixed(0)
                            .toString()
                            .replace(REGEX, ",")}%`
                        : "비공개"}
                    </InfoPercent>
                    {states.data.video.video_views /
                      states.data.video.avg_videoviews >
                      0 && (
                      <Rise src={require("../../Asset/images/Rise_icon.svg")} />
                    )}
                  </LikeContainer>
                </LikeDisLike>
              </>
            )}
          </ChartContainer>
        </Container>
      </BGSecond>
    </>
  );
}

export default connector(VideoDetailPresenter);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
