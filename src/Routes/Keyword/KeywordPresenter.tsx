import React from "react";
import styled, { css } from "styled-components";
import { Helmet } from "react-helmet";

import Loader from "../../Components/Container/Loader";
import WordMap from "../../Components/Charts/Wordmap";
import LineChart from "../../Components/Charts/LineChart";
import KeywordChart from "../../Components/Charts/KeywordChart";
import VideoList from "../../Components/Lists/VideoList";
import SearchBar from "../../Components/Container/SearchBar";
import { BGSecond } from "../../Components/Container/BGContiner";
import NoticeTooltip from "../../Components/Container/NoticeTooltip";
import Slogan from "../../Components/Text/Slogan";
import Red from "../../Components/Text/Red";
import Title from "../../Components/Text/Title";
import { connector, IProps } from "./connectors/presenter";

// 화면에 나타날 style을 포함한 Element들을 선언
const SloganContainer = styled.div`
  margin: 90px 0 60px 0;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbe0f5;
  width: 1200px;
  margin: 50px auto;
`;

const TitleIcon = styled.img`
  width: 35px;
  height: 37px;
  margin-right: 15px;
`;

const Container = styled.div`
  width: 1220px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px auto;
`;

const AnalysisSection = styled.div`
  width: 870px;
`;

const AsideSection = styled.div`
  width: 300px;
`;

const SubtitleContainer = styled.div`
  display: inline-block;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
  margin-bottom: 20px;
  margin-right: 10px;
`;

const SForm = styled.form`
  float: right;
  display: inline-flex;
  align-items: center;
`;

const RadioBt = styled.input.attrs({
  type: "radio",
})`
  display: none;
`;

const RadioLabel = styled.label`
  color: #666;
  height: 30px;
  display: inline-flex;
  align-items: center;

  ::before {
    content: " ";
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #dbe0f5;
    background-color: #fff;
    margin-right: 5px;
    box-shadow: 0 3px 6px 0 rgba(95, 111, 174, 0.2);
    cursor: pointer;
  }
`;

const RadioContainer = styled.div`
  position: relative;
  vertical-align: middle;

  margin-left: 20px;
  input[type="radio"]:checked + label:after {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    content: " ";
    top: 8px;
    left: 7px;
    position: absolute;
    background: #d10909;
    cursor: pointer;
  }
`;

interface ITypeProps {
  setPadding: boolean;
}

const GraphContainer = styled.div<ITypeProps>`
  height: 400px;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
  padding: 5px;
  ${({ setPadding }) =>
    setPadding &&
    css`
      padding-top: 45px;
    `}
  margin-bottom:${({ setPadding }) => (setPadding ? "40px" : "70px")};
  background-color: #fff;
`;

const BottomContainer = styled.div`
  width: 1220px;
  margin: 30px auto;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 330px;
  box-sizing: border-box;
  padding: 30px 0px;
  margin-bottom: 40px;
  border-top: 1px solid #dbe0f5;
`;

const KeywordChartContainer = styled.div`
  height: 440px;
  box-sizing: border-box;
  padding: 25px 20px;
  border: 2px solid #ecf1ff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #fff;
  margin-bottom: 40px;
`;

// 키워드(콘텐츠) 분석 결과 페이지의 UI Logic Component 생성
function KeywordPresenter({
  data,
  dispatches,
  search,
  searchKeyword,
  clickWord,
}: IProps) {
  const handleOnChange = (e: React.ChangeEvent) => {
    ((e.currentTarget.getAttribute("value") === "영상화 추이" &&
      data.currentChart === 1) ||
      (e.currentTarget.getAttribute("value") === "인기도 추이" &&
        data.currentChart === 0)) &&
      dispatches.radio();
  }; // 현재 선택 된 라디오 버튼 변경 시 store에 반영

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  }; // 검색 할 내용을 제출 시 실행되는 함수

  return (
    <>
      {/* react-helmet을 통해 웹 문서 header 편집*/}
      <Helmet
        title={`Create Trend ㅣ ${search}`}
        link={[{ rel: "icon", type: "image/png", href: "symbol.png" }]}
      />

      <BGSecond>
        {/* 상단 slogan*/}
        <SloganContainer>
          <Slogan>
            "궁금한 영상 <Red>콘텐츠</Red> 또는 <Red>주제</Red>를 검색해 보세요"
          </Slogan>
        </SloganContainer>

        {/* 검색 창*/}
        <SearchBarContainer onSubmit={handleOnSubmit}>
          <SearchBar searchKeyword={searchKeyword} />
        </SearchBarContainer>

        <TitleContainer>
          <TitleIcon
            src={require("../../Asset/images/hashtag.png")}
            srcSet={
              (require("../../Asset/images/hashtag@2x.png"),
              require("../../Asset/images/hashtag@3x.png"))
            }
          />
          <Title>
            <Red>{search}</Red> 키워드 검색 결과
          </Title>
        </TitleContainer>

        <Container>
          <AnalysisSection>
            <Subtitle>
              <Red>{search}</Red> 워드맵
            </Subtitle>

            <NoticeTooltip
              text={`'${search}'과 연관성이 높은 콘텐츠들을 한 눈에 확인해보세요! `}
            />

            {/* 키워드 관련 WordMap*/}
            <GraphContainer setPadding={false}>
              {data.isLoading ? <Loader /> : <WordMap type="keyword" />}
            </GraphContainer>

            <SubtitleContainer>
              <Subtitle>
                <Red>{search}</Red> 추이
              </Subtitle>

              <NoticeTooltip
                text={`우측에 버튼을 통해 지난 2주 사이의 '${search}' 콘텐츠의 영상화 추이 변화와 인기도 추이 변화를 확인해보세요! `}
              />
            </SubtitleContainer>

            {/* 라디오 버튼*/}
            <SForm>
              <RadioContainer>
                <RadioBt
                  id="videoChart"
                  value="영상화 추이"
                  name="chartType"
                  checked={0 === data.currentChart}
                  onChange={handleOnChange}
                />
                <RadioLabel htmlFor="videoChart">영상화 추이</RadioLabel>
              </RadioContainer>
              <RadioContainer>
                <RadioBt
                  id="popularChart"
                  value="인기도 추이"
                  name="chartType"
                  checked={1 === data.currentChart}
                  onChange={handleOnChange}
                />
                <RadioLabel htmlFor="popularChart"> 인기도 추이</RadioLabel>
              </RadioContainer>
            </SForm>

            {/* 키워드 인기도/영상화 추이 그래프*/}
            <GraphContainer setPadding={true}>
              {data.isLoading ? <Loader /> : <LineChart type="keyword" />}
            </GraphContainer>
          </AnalysisSection>

          <AsideSection>
            <Subtitle>
              <Red>{search}</Red> 키워드 TOP 10
            </Subtitle>

            <NoticeTooltip
              text={`'${search}'과 관련된 인기 키워드, 영상화 키워드 TOP 10을 확인해보세요! `}
            />

            {/* 관련 키워드 차트*/}
            <KeywordChartContainer>
              {data.isLoading ? (
                <Loader />
              ) : (
                <KeywordChart index={0} type="keyword" clickWord={clickWord} />
              )}
            </KeywordChartContainer>
            <KeywordChartContainer>
              {data.isLoading ? (
                <Loader />
              ) : (
                <KeywordChart index={1} type="keyword" clickWord={clickWord} />
              )}
            </KeywordChartContainer>
          </AsideSection>
        </Container>

        <BottomContainer>
          <Subtitle>
            <Red>{search}</Red> 조회수 급상승 영상
          </Subtitle>

          <NoticeTooltip
            text={`'${search}'을 콘텐츠로 하는 조회수 급상승 영상들을 확인해보세요! `}
          />

          {/* 키워드 관련 조회수 급상승 영상 리스트*/}
          <VideoContainer>
            {data.isLoading ? (
              <Loader />
            ) : (
              <VideoList mode="analysis" type="keyword" title={search} />
            )}
          </VideoContainer>

          <Subtitle>
            <Red>{search}</Red> 인기 영상
          </Subtitle>

          <NoticeTooltip
            text={`'${search}'을 콘텐츠로 하는 인기 영상들을 확인해보세요! `}
          />

          {/* 키워드 관련 인기 영상 리스트*/}
          <VideoContainer>
            {data.isLoading ? (
              <Loader />
            ) : (
              <VideoList mode="aside" type="keyword" title={search} />
            )}
          </VideoContainer>
        </BottomContainer>
      </BGSecond>
    </>
  );
}

export default connector(KeywordPresenter);
// 폴더 내 connector에서 생성한 connector를 통해 store의 state를 해당 Component의 props로 전달
