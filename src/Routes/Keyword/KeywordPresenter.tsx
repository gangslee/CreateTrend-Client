import React from 'react';
import styled from 'styled-components';

import WordMap from '../../Components/Charts/Wordmap';
import CommentList from '../../Components/Charts/CommentList';
import LineChart from '../../Components/Charts/LineChart';

const Container = styled.div`
  width: 1040px;
  height: 1000px;
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
`;

const AnalysisSection = styled.div`
  width: 700px;
  height: 1000px;
  /* border: 1px solid #aaa; */
`;

const LineChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* height: 250px; */
  margin-bottom: 30px;
`;

const VideoSection = styled.div`
  width: 290px;
  height: 1000px;
  border: 1px solid #aaa;
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
            <WordMap />
            <CommentList />
            <LineChartContainer>
              <LineChart index={0} />
              <LineChart index={1} />
            </LineChartContainer>
          </AnalysisSection>
          <VideoSection></VideoSection>
        </>
      ) : (
        <h1>NOTYET</h1>
      )}
    </Container>
  );
}
