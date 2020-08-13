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
`;

function mapStateToProps(state: RootState) {
  return {
    data: state.star.keyword.pie,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function PieChart({data}: Props) {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = am4core.create('keyword-piechart', am4charts.PieChart3D);
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

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <Container id="keyword-piechart" />;
}

export default connector(PieChart);
