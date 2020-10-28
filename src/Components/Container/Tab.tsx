import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store/store';

type styleType = {
  type: string;
};

const Container = styled.div<styleType>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  ${({type}) =>
    type === 'chart' &&
    css`
      border-bottom: 1px solid #dbe0f5;
    `};
`;

interface ITabContainerProps {
  current: boolean;
  onClick: (e: React.MouseEvent) => void;
  type: string;
}

const TabContainer = styled.div<ITabContainerProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 100%;
  background-color: ${({current}) => (current ? '#dd0909' : '#fff')};
  cursor: pointer;
  color: ${({current}) => (current ? '#fff' : '#999')};
  ${({type}) =>
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
    states: {
      chart: state.statistics.currentChart,
      search: state.home.searchType,
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

function Tab({states, stateFunc, type}: ITabProps) {
  const chartType = type === 'chart' ? states.chart : states.search;
  const titles = type === 'chart' ? ['인기', '영상'] : ['콘텐츠', '스타채널'];
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
