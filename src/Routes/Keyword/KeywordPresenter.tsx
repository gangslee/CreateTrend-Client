import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../Components/Container/Loader';
import WordMap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import KeywordChart from '../../Components/Charts/KeywordChart';
import VideoList from '../../Components/Lists/VideoList';
import {RootState} from '../../store';

const Container = styled.div`
  width: 1040px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 50px auto;
`;

const AnalysisSection = styled.div`
  width: 700px;
`;

const WordMapContainer = styled.div`
  height: 320px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 40px;
`;

const LineChartContainer = styled.div`
  width: 48%;
  height: 215px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 5px;
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
  ${({mode}: IVideoProps) =>
    mode === 'aside' &&
    css`
      width: 290px;
    `};
`;

const KeywordChartContainer = styled.div`
  height: 430px;
  width: 48%;
  box-sizing: border-box;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
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

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
interface IKeywordPresenter extends Props {
  search: string;
}

function KeywordPresenter({search, data}: IKeywordPresenter) {
  return (
    <Container>
      <AnalysisSection>
        <WordMapContainer>
          {data.wordmap !== null ? <WordMap type="keyword" title={search} /> : <Loader />}
        </WordMapContainer>

        <ChartContainer>
          {[0, 1].map((idx, index) => (
            <LineChartContainer key={idx}>
              {data.wordmap !== null ? (
                <LineChart index={idx} type="keyword" title={search} />
              ) : (
                <Loader />
              )}
            </LineChartContainer>
          ))}
        </ChartContainer>
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
          {/* <KeywordChart index={0} title={search} /> */}
          {/* <KeywordChart index={1} title={search} /> */}
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
  );
}

export default connector(KeywordPresenter);
