import React, {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import {RootState} from '../../store';

const Container = styled.div`
  width: 325px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const LineChartContainer = styled.div`
  height: 95%;
`;

function mapStateToProps(state: RootState) {
  return {data: state.keyword.lines};
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ILineChartProps extends Props {
  index?: number;
}

function LineChart({data, index}: ILineChartProps) {
  console.log(data, index);

  const chartRef = useRef(null);
  useLayoutEffect(() => {
    const useData = index ? data[index] : data[0];
    const chart = am4core.create(useData.name, am4charts.XYChart);
    chart.data = useData.data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.renderer.fontSize = 12;
    dateAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.fontSize = 12;
    valueAxis.renderer.line.strokeWidth = 2;

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = 'Value';
    series.stroke = am4core.color('#CDA2AB');
    series.strokeWidth = 3;
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{dateX} :[bold] {valueY}[/]';

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'none';

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, index]);

  return (
    <Container>
      <LineChartContainer id={data[index].name} />
    </Container>
  );
}

export default connector(LineChart);
