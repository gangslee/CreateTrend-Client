import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

type styleType = {
  type: string;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({type}: styleType) =>
    type === 'chart'
      ? css`
          border-bottom: 2px solid #ddd;
        `
      : css`
          display: flex;
          justify-content: space-between;
        `};
`;

interface ITabContainerProps {
  current: boolean;
  onClick: (e: React.MouseEvent) => void;
  type: string;
}

const TabContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  background-color: ${({current}: ITabContainerProps) => (current ? '#dd0909' : '#fff')};
  cursor: pointer;
  color: ${({current}: ITabContainerProps) => (current ? '#fff' : '#999')};
  ${({type}: ITabContainerProps) =>
    type === 'search' &&
    css`
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      ${({current}: ITabContainerProps) =>
        !current &&
        css`
          border: 1px solid #dbdbdb;
        `}
    `};
`;

const TabTitle = styled.span`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
`;

function mapStateToProps(state: RootState) {
  return {
    state: {
      chart: state.page === 'home' ? state.home.searchType : state.statistics.currentChart,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ITabProps extends Props {
  type: string;
  stateFunc: () => void;
}

function Tab({state, stateFunc, type}: ITabProps) {
  const chartType = state.chart;
  const titles = type === 'chart' ? ['인기', '영상'] : ['키워드', '스타채널'];
  const currentType = titles[chartType];

  const handleOnClick = (e: React.MouseEvent) => {
    if (e.currentTarget.innerHTML !== currentType) {
      stateFunc();
    }
  };

  return (
    <Container type={type}>
      {titles.map((title) => (
        <TabContainer
          key={title}
          type={type}
          current={currentType === title}
          onClick={handleOnClick}
        >
          <TabTitle>{title}</TabTitle>
        </TabContainer>
      ))}
    </Container>
  );
}

export default connector(Tab);
