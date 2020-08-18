import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, disableUseAbleKeyword} from '../../store';
import {Link} from 'react-router-dom';

type styleType = {
  type: string;
  current?: boolean;
};

const Container = styled.div`
  ${({type}: styleType) =>
    type === 'keyword' &&
    css`
      width: 48%;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
    `};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
  :first-child {
    color: #feb100;
  }
`;

const KeywordChartContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  padding: 5px 10px;
  font-size: ${({type}: styleType) => (type === 'keyword' ? '16px' : '18px')};
  font-weight: 600;
  :not(:last-child) {
    border-bottom: 2px solid #ddd;
  }
  ${({type, current}: styleType) =>
    type === 'statistics' &&
    current &&
    css`
      color: #feb100;
    `};
`;

const Rank = styled.div`
  display: inline-block;
  width: 10%;
  text-align: center;
`;

const KeywordContainer = styled.div`
  display: inline-block;
  width: 89%;
  text-align: center;
`;

const Keyword = styled.span`
  cursor: pointer;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 150px;
`;

const Error = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

function mapStateToProps(state: RootState) {
  return {
    data:
      state.page === 'keyword'
        ? state.keyword.keyword
        : [state.statistics.keywordChart[state.statistics.currentChart]],
    state: {
      page: state.page,
      chart: state.statistics.currentChart,
      keyword: state.statistics.currentKeyword,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {disableUseable: () => dispatch(disableUseAbleKeyword())};
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IKeywordChartProps extends Props {
  index?: number;
  title?: string;
  stateFunc?: (n: number) => void;
  disableFunc?: () => void;
}

function KeywordChart({data, state, index, title, stateFunc, disableUseable}: IKeywordChartProps) {
  const usingData = state.page === 'keyword' ? data[index] : data[0];

  const handleKeywordClick = (e: React.MouseEvent) => {
    const idx = usingData.keyword.findIndex((data) => data.name === e.currentTarget.innerHTML);
    stateFunc(idx);
  };

  const handleSLinkClick = (e: React.MouseEvent) => {
    disableUseable();
  };

  return (
    <Container type={state.page}>
      {state.page === 'keyword' && (
        <TitleContainer>
          <Title>{title}</Title>
          <Title>{` 관련 ${usingData.type}`}</Title>
        </TitleContainer>
      )}
      {usingData.keyword.length === 0 ? (
        <ErrorContainer>
          <Error>분석결과가 없습니다!</Error>
        </ErrorContainer>
      ) : (
        <>
          {usingData.keyword.map((keyword, index) => (
            <KeywordChartContainer current={state.keyword === index} type={state.page} key={index}>
              <Rank>{index + 1}</Rank>
              {state.page === 'keyword' ? (
                <KeywordContainer>
                  <SLink to={`/keyword/${keyword.name}`} onClick={handleSLinkClick}>
                    <Keyword>{keyword.name}</Keyword>
                  </SLink>
                </KeywordContainer>
              ) : (
                <KeywordContainer>
                  <Keyword onClick={handleKeywordClick}>{keyword.name}</Keyword>
                </KeywordContainer>
              )}
            </KeywordChartContainer>
          ))}
        </>
      )}
    </Container>
  );
}

export default connector(KeywordChart);
