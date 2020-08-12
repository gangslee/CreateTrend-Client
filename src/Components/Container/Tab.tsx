import React from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

type styleType = {
  type: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: ${({type}: styleType) => (type === 'channel' ? '75px' : '55px')};

  border: 1px solid #ddd;
  box-sizing: border-box;
  ${({type}: styleType) =>
    type === 'channel'
      ? css`
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
          margin-bottom: 30px;
        `
      : css`
          border-bottom: 2px solid #ddd;
        `};
`;

interface ITabContainerProps {
  current: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const TabContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${({current}: ITabContainerProps) => (current ? '#fff9eb' : '#fff')};
  cursor: pointer;
  color: ${({current}: ITabContainerProps) => (current ? '#feb100' : '#ccc')};
  :first-child {
    border-right: 1px solid #ddd;
  }
`;

const TabTitle = styled.span`
  display: inline-flex;
  height: ${({type}: styleType) => (type === 'channel' ? '30px' : '22px')};
  align-items: center;
  font-size: ${({type}: styleType) => (type === 'channel' ? '30px' : '22px')};
  font-weight: 600;
`;

function mapStateToProps(state: RootState) {
  return {
    state: {
      chart: state.statistics.currentChart,
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
  const titles = ['인기', '영상'];
  const currentType = titles[chartType];

  const handleOnClick = (e: React.MouseEvent) => {
    if (e.currentTarget.innerHTML !== currentType) {
      stateFunc();
    }
  };

  return (
    <Container type={type}>
      {titles.map((title) => (
        <TabContainer key={title} current={currentType === title} onClick={handleOnClick}>
          <TabTitle type={type}>{title}</TabTitle>
        </TabContainer>
      ))}
    </Container>
  );
}

export default connector(Tab);
