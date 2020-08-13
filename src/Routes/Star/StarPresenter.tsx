import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1040px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 50px auto;
  border: 1px solid #ddd;
`;

const AnalysisSection = styled.div`
  width: 700px;
  border: 1px solid #ddd;
  height: 1000px;
`;

const VideoSection = styled.div`
  width: 290px;
  border: 1px solid #ddd;
  height: 1000px;
`;

function StarPresenter() {
  return (
    <Container>
      <AnalysisSection></AnalysisSection>
      <VideoSection></VideoSection>
    </Container>
  );
}

export default StarPresenter;
