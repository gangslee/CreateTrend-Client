import React from "react";
import styled from "styled-components";

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
  border: 1px solid #aaa;
`;

const VideoSection = styled.div`
  width: 290px;
  height: 1000px;
  border: 1px solid #aaa;
`;

export default function KeywordPresenter() {
  return (
    <Container>
      <AnalysisSection></AnalysisSection>
      <VideoSection></VideoSection>
    </Container>
  );
}
