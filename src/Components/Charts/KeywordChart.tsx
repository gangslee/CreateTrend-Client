import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch} from '../../store/store';
import {callLoader} from '../../store/reducers/keyword';
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
  align-items: center;
  padding: 0px 25px;
  box-sizing: border-box;
  line-height: ${({type}: styleType) => (type === 'keyword' ? '2.67' : '60px')};
  font-family: 'S-CoreDream-4Regular';
  font-stretch: normal;
  letter-spacing: normal;
  font-size: ${({type}: styleType) => (type === 'keyword' ? '15px' : '18px')};
  font-weight: 600;
  ${({type, current}: styleType) =>
    type === 'statistics' &&
    current &&
    css`
      color: #d10909;
      font-family: 'S-CoreDream-6Bold';
      border: solid 2px #d10909;
      border-bottom: 2px solid #d10909;
      padding: 2px 23px;
    `};
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Rank = styled.span`
  width: 15%;
  font-family: 'NotoSans';
  font-weight: bold;
  display: inline-block;
  text-align: center;
  margin-right: 15px;
  color: #222;
  ${({type}: styleType) =>
    type === 'statistics' &&
    css`
      font-size: 25px;
    `}
`;

const Keyword = styled.div`
  width: 89%;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #d10909;
  }
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

interface OwnProps {
  type: string;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    states: {
      data:
        ownProps.type === 'keyword'
          ? state.keyword.keyword
          : state.statistics.keywordChart !== null
          ? [state.statistics.keywordChart[state.statistics.currentChart]]
          : null,

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
  type?: string;
  stateFunc?: (n: number) => void;
  clickWord?: (word: string) => void;
}

function KeywordChart({states, dispatches, index, type, stateFunc, clickWord}: IKeywordChartProps) {
  const usingData =
    states.data !== null && (type === 'keyword' ? states.data[index] : states.data[0]);

  const handleKeywordClick = (e: React.MouseEvent) => {
    const idx = usingData.keyword.findIndex((data) => data.name === e.currentTarget.innerHTML);
    stateFunc(idx);
  };

  const handleSLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    clickWord(e.currentTarget.innerHTML);
  };

  return (
    <>
      {type === 'keyword' && (
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
            <KeywordChartContainer current={states.keyword === index} type={type} key={index}>
              {type === 'keyword' ? (
                <KeywordContainer>
                  <Rank type={type}>{index + 1}</Rank>
                  <Keyword>
                    <SLink to={`/keyword/${keyword.name}`} onClick={handleSLinkClick}>
                      {keyword.name}
                    </SLink>
                  </Keyword>
                </KeywordContainer>
              ) : (
                <KeywordContainer>
                  <Rank type={type}>{index + 1}</Rank>
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
