import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

const Container = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const WordmapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface OwnProps {
  type: string;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    data: ownProps.type === 'star' ? state.star.keyword.pie : state.period.keyword.pie,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IPieChartProps extends Props {
  stateFunc: (n: number) => void;
  type: string;
}

function PieChart({data, stateFunc, type}: IPieChartProps) {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = am4core.create(`${type}-pieChart`, am4charts.PieChart3D);
    chart.innerRadius = am4core.percent(40);
    chart.data = data;

    const pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'name';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    pieSeries.slices.template.events.on('hit', (e) => {
      pieSeries.slices.each((item) => {
        if (item.isActive && item !== e.target) {
          item.isActive = false;
        }
      });
      if (e.target.isActive) {
        const idx = data.findIndex((data) => data.name === e.target.dataItem.properties.category);
        stateFunc(idx);
      }
    });

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, stateFunc, type]);

  return (
    <Container>
      <WordmapContainer id={`${type}-pieChart`} />
    </Container>
  );
}

export default connector(PieChart);
