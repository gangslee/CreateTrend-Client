import React from 'react';
import styled from 'styled-components';

import WordMap from '../../Components/Charts/Wordmap';
import LineChart from '../../Components/Charts/LineChart';
import KeywordChart from '../../Components/Charts/KeywordChart';
import VideoList from '../../Components/Lists/VideoList';

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

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 40px;
  }
`;

const VideoSection = styled.div`
  width: 290px;
`;

interface IKeywordPresenter {
  loading: boolean;
}

export default function KeywordPresenter({loading}: IKeywordPresenter) {
  return (
    <Container>
      {loading ? (
        <>
          <AnalysisSection>
            <WordMap type="keyword" />
            <ChartContainer>
              <LineChart index={0} type="keyword" />
              <LineChart index={1} type="keyword" />
            </ChartContainer>
            <VideoList mode="analysis" type="keyword" />
            <ChartContainer>
              <KeywordChart index={0} />
              <KeywordChart index={1} />
            </ChartContainer>
          </AnalysisSection>
          <VideoSection>
            <VideoList mode="aside" type="keyword"></VideoList>
          </VideoSection>
        </>
      ) : (
        <h1>NOTYET</h1>
      )}
    </Container>
  );
}
