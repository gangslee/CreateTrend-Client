import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Tab from '../../Components/Container/Tab';
import Loader from '../../Components/Container/Loader';
import KeywordChart from '../../Components/Charts/KeywordChart';
import TextContainer from '../../Components/Container/TextContainer';
import Wordmap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootState} from '../../store/store';

const Container = styled.div`
  width: 1040px;
  margin: 50px auto;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  width: 25%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const KeywordChartContainer = styled.div`
  height: 410px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 73%;
  border: 1px solid #ddd;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const SubResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48%;
`;

const WordmapContainer = styled.div`
  width: 70%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const LineChartContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 5px;
`;

const VideoContainer = styled.div`
  height: 225px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
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
  console.log(data);
  return (
    <Container>
      <KeywordContainer>
        <ChartContainer>
          <Tab type="chart" stateFunc={funcs.chart} />
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
          data.keywordChart[data.currentChart].keyword[data.currentKeyword].wordmap !== undefined &&
          data.keywordChart[data.currentChart].keyword[data.currentKeyword].popular !== undefined &&
          data.keywordChart[data.currentChart].keyword[data.currentKeyword].line !== undefined ? (
            <>
              <SubResultContainer>
                <TextContainer type="popular" title={title} />
                <WordmapContainer>
                  <Wordmap type="statistics" />
                </WordmapContainer>
              </SubResultContainer>
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
  );
}

export default connector(ChannelPresenter);
