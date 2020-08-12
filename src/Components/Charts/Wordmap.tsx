import React, {useRef, useLayoutEffect} from 'react';
import styled, {css} from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

type containerType = {
  type: string;
};

const Container = styled.div`
  height: ${({type}: containerType) => (type === 'keyword' ? '320px' : '100%')};
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);

  ${({type}: containerType) =>
    type === 'keyword' &&
    css`
      margin-bottom: 40px;
      padding: 20px;
    `};
`;

const WordmapContainer = styled.div`
  height: 95%;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    margin-right: 5px;
  }
`;

function mapStateToProps(state: RootState) {
  if (state.page === 'keyword') {
    return {data: state.keyword.wordmap};
  } else if (state.page === 'statistics') {
    const statistics = state.statistics;
    const statisticsList = statistics.keywordChart[statistics.currentChart];
    const statisticsData = statisticsList.keyword[statisticsList.current];
    return {data: statisticsData.wordmap};
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IWordMapProps extends Props {
  type: string;
}

function WordMap({data, type}: IWordMapProps) {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const chart = am4core.create('keyword-wordmap', am4plugins_forceDirected.ForceDirectedTree);
    const series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    series.data = data;
    // Set up data fields
    series.dataFields.value = 'value';
    series.dataFields.name = 'name';
    series.dataFields.children = 'children';

    // Add labels
    series.nodes.template.label.text = '{name}';
    series.fontSize = type === 'keyword' ? 15 : 12;
    // series.fontWeight = 'bold';
    series.minRadius = am4core.percent(6);
    series.maxRadius = am4core.percent(12);
    series.nodes.template.tooltipText = '{name}';
    series.nodes.template.label.hideOversized = true;
    series.nodes.template.label.truncate = true;

    chartRef.current = chart;
    return () => {
      chart.dispose();
    };
  }, [data, type]);

  return (
    <Container type={type}>
      {type === 'keyword' && (
        <>
          <Title>리그오브레전드</Title>
          <Title>인기 영상</Title>
        </>
      )}

      <WordmapContainer id="keyword-wordmap" />
    </Container>
  );
}

export default connector(WordMap);
