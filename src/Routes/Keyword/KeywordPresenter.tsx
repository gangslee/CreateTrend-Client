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

const SearchBarContainer = styled.form`
  display: flex;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
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

const AsideSection = styled.div`
  width: 380px;
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

const Notice = styled.div`
  display: none;
  width: 225px;
  height: 90px;
  box-shadow: 5px 5px 10px 0 rgba(95, 111, 174, 0.3);
  background-color: #d10909;
  position: absolute;
  top: 25px;
  left: 30px;
  border-radius: 10px;
  border-top-left-radius: 0;
  padding: 20px 25px;
  font-family: 'S-CoreDream-4Regular';
  font-weight: normal;
  font-size: 15px;
  line-height: 1.67;
  color: #fff;
`;

const NoticeIcon = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #b8c0e1;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  line-height: 2;
  text-align: center;
  font-family: 'S-CoreDream-5Medium';
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const NoticeContainer = styled.div`
  display: inline-block;
  position: relative;
  &:hover {
    ${Notice} {
      display: inline-block;
      transition: all 1s ease-in-out;
    }
  }
`;

const GraphContainer = styled.div`
  height: 330px;
  box-sizing: border-box;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 40px;
  background-color: #fff;
`;

interface IVideoProps {
  mode: string;
}

const VideoContainer = styled.div`
  height: ${({mode}: IVideoProps) => (mode === 'analysis' ? '250px' : '610px')};
  box-sizing: border-box;
  border: 2px solid #ecf1ff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: ${({mode}: IVideoProps) => (mode === 'analysis' ? '10px' : '15px 10px')};
  margin-bottom: 40px;
  background-color: #fff;
  ${({mode}: IVideoProps) =>
    mode === 'analysis' &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const KeywordChartContainer = styled.div`
  height: 560px;
  width: 48%;
  box-sizing: border-box;
  padding: 45px 25px;
  border: 2px solid #ecf1ff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
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
  submit: (e: React.FormEvent) => void;
}

function KeywordPresenter({data, dispatches, search, submit}: IKeywordPresenter) {
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
      <SearchBarContainer onSubmit={submit}>
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

          {/* <SubtitleContainer>
            <Subtitle>
              <TitleRed>{search}</TitleRed> 추이
            </Subtitle>
            <NoticeContainer>
              <NoticeIcon>?</NoticeIcon>
              <Notice>원하는 키워드를 선택하여 동향을 파악해 보세요.</Notice>
            </NoticeContainer>
          </SubtitleContainer>
          <SForm>
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
          </SForm>

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
          </ChartContainer> */}
        </AnalysisSection>

        <AsideSection>
          <Subtitle>
            <TitleRed>{search}</TitleRed> 인기 영상
          </Subtitle>
          <VideoContainer mode="aside">
            {data.video !== null ? (
              <VideoList mode="aside" type="keyword" title={search} />
            ) : (
              <Loader />
            )}
          </VideoContainer>
        </AsideSection>
      </Container>
    </BgContainer>
  );
}

export default connector(KeywordPresenter);
