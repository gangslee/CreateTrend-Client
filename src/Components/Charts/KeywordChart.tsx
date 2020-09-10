import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, callLoader} from '../../store';
import {Link} from 'react-router-dom';

type styleType = {
  type: string;
  current?: boolean;
};

const Subtitle = styled.div`
  font-size: 22px;
  line-height: 1.36;
  text-align: center;
  padding-bottom: 25px;
  border-bottom: 2px solid #222;
`;

const TitleRed = styled.span`
  color: #d10909;
`;

const KeywordChartContainer = styled.div`
  display: flex;
  padding: 0px 25px;
  align-items: center;
  line-height: 2.67;
  font-stretch: normal;
  letter-spacing: normal;
  font-size: ${({type}: styleType) => (type === 'keyword' ? '15px' : '18px')};
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

const Rank = styled.span`
  width: 10%;
  font-family: 'NotoSans';
  font-weight: bold;
  display: inline-block;
  text-align: center;
  margin-right: 15px;
`;

const KeywordContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Keyword = styled.div`
  font-family: 'S-CoreDream-4Regular';
  color: #222;
  font-weight: normal;
  text-align: center;
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
        : state.statistics.keywordChart !== null
        ? [state.statistics.keywordChart[state.statistics.currentChart]]
        : null,
    state: {
      page: state.page,
      chart: state.statistics.currentChart,
      keyword: state.statistics.currentKeyword,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      callLoader: () => {
        dispatch(callLoader());
      },
    },
  };
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

function KeywordChart({data, state, dispatches, index, title, stateFunc}: IKeywordChartProps) {
  const usingData = data !== null && (state.page === 'keyword' ? data[index] : data[0]);

  const handleKeywordClick = (e: React.MouseEvent) => {
    const idx = usingData.keyword.findIndex((data) => data.name === e.currentTarget.innerHTML);
    stateFunc(idx);
  };

  const handleSLinkClick = (e: React.MouseEvent) => {
    dispatches.callLoader();
  };

  return (
    <>
      {state.page === 'keyword' && (
        <Subtitle>
          {usingData.type} <TitleRed>TOP 10</TitleRed>
        </Subtitle>
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
    </>
  );
}

export default connector(KeywordChart);
