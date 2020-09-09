import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import WordMap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import KeywordChart from '../../Components/Charts/KeywordChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootState, RootDispatch, setRadioState} from '../../store';
import bg from '../../Asset/images/bg2.svg';
import SearchBar from '../../Components/Container/SearchBar';

const BgContainer = styled.div`
  background-image: url(${bg});
  padding-left: 80px;
  margin-left: -80px;
  margin-top: -80px;
  padding-top: 150px;
  padding-bottom: 50px;
  font-family: 'S-CoreDream-6Bold';
  font-stretch: normal;
  letter-spacing: normal;
  color: #222;
`;

const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin: 70px 0px;
`;

const SloganRed = styled.span`
  color: #dd0909;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1220px;
  margin: 50px auto;
  padding: 20px 0px;
  border-bottom: 1px solid #dbe0f5;
`;

const Title = styled.span`
  font-size: 25px;
  color: #333;
  line-height: 1.4;
`;

const TitleRed = styled.span`
  color: #d10909;
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
  width: 790px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
  margin-bottom: 20px;
`;

const RadioBt = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;

const RadioLabel = styled.label`
  color: #666;
  height: 30px;
  display: inline-flex;
  align-items: center;

  ::before {
    content: ' ';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #dbe0f5;
    background-color: #fff;
    margin-right: 5px;
    box-shadow: 0 3px 6px 0 rgba(95, 111, 174, 0.2);
  }
`;

const RadioContainer = styled.div`
  position: relative;
  vertical-align: middle;
  float: right;
  margin-left: 20px;
  input[type='radio']:checked + label:after {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    content: ' ';
    top: 8px;
    left: 7px;
    position: absolute;
    background: #d10909;
  }
`;

const SubtitleContainer = styled.div``;

const GraphContainer = styled.div`
  height: 330px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 5px;
  margin-bottom: 40px;
  background-color: #fff;
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
  background-color: #fff;
  ${({mode}: IVideoProps) =>
    mode === 'aside' &&
    css`
      width: 380px;
    `};
`;

const KeywordChartContainer = styled.div`
  height: 430px;
  width: 48%;
  box-sizing: border-box;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 40px;
  }
`;

function mapStateToProps(state: RootState) {
  return {
    data: state.keyword,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      radio: () => {
        dispatch(setRadioState());
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
interface IKeywordPresenter extends Props {
  search: string;
}

function KeywordPresenter({search, data, dispatches}: IKeywordPresenter) {
  const handleOnClickRadio = (e: React.MouseEvent) => {
    ((e.currentTarget.getAttribute('value') === '영상화 추이' && data.currentChart === 1) ||
      (e.currentTarget.getAttribute('value') === '인기도 추이' && data.currentChart === 0)) &&
      dispatches.radio();
  };
  return (
    <BgContainer>
      <Slogan>
        "궁금한 <SloganRed>키워드</SloganRed>를 검색해 보세요"
      </Slogan>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>

      <TitleContainer>
        <TitleIcon
          src={require('../../Asset/images/tag.png')}
          srcSet={
            (require('../../Asset/images/tag@2x.png'), require('../../Asset/images/tag@3x.png'))
          }
        />
        <Title>
          <TitleRed>{search}</TitleRed> 키워드 검색 결과
        </Title>
      </TitleContainer>

      <Container>
        <AnalysisSection>
          <Subtitle>
            <TitleRed>{search}</TitleRed> 워드맵
          </Subtitle>

          <GraphContainer>
            {data.wordmap !== null ? <WordMap type="keyword" /> : <Loader />}
          </GraphContainer>

          <SubtitleContainer>
            <Subtitle>
              <TitleRed>{search}</TitleRed> 추이
            </Subtitle>

            <RadioContainer>
              <RadioBt
                id="popularChart"
                value="인기도 추이"
                name="chartType"
                defaultChecked={1 === data.currentChart}
                onClick={handleOnClickRadio}
              />
              <RadioLabel htmlFor="popularChart"> 인기도 추이</RadioLabel>
            </RadioContainer>
            <RadioContainer>
              <RadioBt
                id="videoChart"
                value="영상화 추이"
                name="chartType"
                defaultChecked={0 === data.currentChart}
                onClick={handleOnClickRadio}
              />
              <RadioLabel htmlFor="videoChart">영상화 추이</RadioLabel>
            </RadioContainer>
          </SubtitleContainer>

          <GraphContainer>
            {data.lines !== null ? <LineChart type="keyword" /> : <Loader />}
          </GraphContainer>

          <Subtitle>
            <TitleRed>{search}</TitleRed> 조회수 급상승 영상
          </Subtitle>

          <VideoContainer mode="analysis">
            {data.video !== null ? (
              <VideoList mode="analysis" type="keyword" title={search} />
            ) : (
              <Loader />
            )}
          </VideoContainer>
          <ChartContainer>
            {[0, 1].map((idx) => (
              <KeywordChartContainer key={idx}>
                {data.wordmap !== null ? <KeywordChart index={idx} title={search} /> : <Loader />}
              </KeywordChartContainer>
            ))}
          </ChartContainer>
        </AnalysisSection>
        <VideoContainer mode="aside">
          {data.video !== null ? (
            <VideoList mode="aside" type="keyword" title={search} />
          ) : (
            <Loader />
          )}
        </VideoContainer>
      </Container>
    </BgContainer>
  );
}

export default connector(KeywordPresenter);
