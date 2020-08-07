import React, {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

const Container = styled.div`
  height: 320px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  padding: 20px;
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
  return {data: state.keyword.wordmap};
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function WordMap({data}: Props) {
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
    series.fontSize = 15;
    series.fontWeight = 'bold';
    series.minRadius = 30;
    series.maxRadius = 60;

    chartRef.current = chart;
    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <Container>
      <Title>리그오브레전드</Title>
      <Title>인기 영상</Title>
      <WordmapContainer id="keyword-wordmap" />
    </Container>
  );
}

export default connector(WordMap);
