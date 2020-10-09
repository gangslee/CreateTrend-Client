import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import WordMap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import KeywordChart from '../../Components/Charts/KeywordChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootState, RootDispatch} from '../../store/store';
import {setRadioState} from '../../store/reducers/keyword';
import SearchBar from '../../Components/Container/SearchBar';
import {BGSecond} from '../../Components/Container/BGContiner';
import NoticeTooltip from '../../Components/Container/NoticeTooltip';

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
    cursor: pointer;
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
    cursor: pointer;
  }
`;

interface ITypeProps {
  setPadding: boolean;
}

const GraphContainer = styled.div`
  height: 330px;
  border: 2px solid #ecf1ff;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
  padding: 5px;

  margin-bottom: 40px;
  background-color: #fff;
  ${({setPadding}: ITypeProps) =>
    setPadding &&
    css`
      padding-top: 45px;
    `}
`;

interface IVideoProps {
  mode: string;
}

const VideoContainer = styled.div`
  height: ${({mode}: IVideoProps) => (mode === 'analysis' ? '250px' : '750px')};
  box-sizing: border-box;
  border: 2px solid #ecf1ff;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  padding: ${({mode}: IVideoProps) => (mode === 'analysis' ? '10px' : '50px 20px')};
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
  height: 530px;
  width: 48%;
  box-sizing: border-box;
  padding: 35px 25px;
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
  searchKeyword: () => void;
  clickWord: (word: string) => void;
}

function KeywordPresenter({data, dispatches, search, searchKeyword, clickWord}: IKeywordPresenter) {
  const handleOnChange = (e: React.ChangeEvent) => {
    ((e.currentTarget.getAttribute('value') === '영상화 추이' && data.currentChart === 1) ||
      (e.currentTarget.getAttribute('value') === '인기도 추이' && data.currentChart === 0)) &&
      dispatches.radio();
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  };

  return (
    <BGSecond>
      <Slogan>
        "궁금한 <SloganRed>키워드</SloganRed>를 검색해 보세요"
      </Slogan>
      <SearchBarContainer onSubmit={handleOnSubmit}>
        <SearchBar searchKeyword={searchKeyword} />
      </SearchBarContainer>

      <TitleContainer>
        <TitleIcon
          src={require('../../Asset/images/hashtag.png')}
          srcSet={
            (require('../../Asset/images/hashtag@2x.png'),
            require('../../Asset/images/hashtag@3x.png'))
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

          <GraphContainer setPadding={false}>
            {data.isLoading ? <Loader /> : <WordMap type="keyword" />}
          </GraphContainer>

          <SubtitleContainer>
            <Subtitle>
              <TitleRed>{search}</TitleRed> 추이
            </Subtitle>
            <NoticeTooltip text="원하는 키워드를 선택하여 동향을 파악해 보세요." />
          </SubtitleContainer>

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

          <GraphContainer setPadding={true}>
            {data.isLoading ? <Loader /> : <LineChart type="keyword" />}
          </GraphContainer>

          <Subtitle>
            <TitleRed>{search}</TitleRed> 조회수 급상승 영상
          </Subtitle>

          <VideoContainer mode="analysis">
            {data.isLoading ? (
              <Loader />
            ) : (
              <VideoList mode="analysis" type="keyword" title={search} />
            )}
          </VideoContainer>
          <ChartContainer>
            {[0, 1].map((idx) => (
              <KeywordChartContainer key={idx}>
                {data.isLoading ? (
                  <Loader />
                ) : (
                  <KeywordChart index={idx} type="keyword" clickWord={clickWord} />
                )}
              </KeywordChartContainer>
            ))}
          </ChartContainer>
        </AnalysisSection>

        <AsideSection>
          <Subtitle>
            <TitleRed>{search}</TitleRed> 인기 영상
          </Subtitle>
          <VideoContainer mode="aside">
            {data.isLoading ? <Loader /> : <VideoList mode="aside" type="keyword" title={search} />}
          </VideoContainer>
        </AsideSection>
      </Container>
    </BGSecond>
  );
}

export default connector(KeywordPresenter);
