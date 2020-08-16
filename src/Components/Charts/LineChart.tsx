import React, {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import {RootState} from '../../store';

type containerType = {
  type: string;
};

const Container = styled.div`
  width: ${({type}: containerType) => (type === 'keyword' ? '48%' : '100%')};
  height: 100%;
  box-sizing: border-box;
  /* border-radius: 15px; */
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px 5px;
`;

const TitleContainer = styled.div`
  margin: 10px 15px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    margin-right: 5px;
  }
`;

const LineChartContainer = styled.div`
  height: 95%;
`;

interface OwnProps {
  match: {
    params: {
      id: string;
    };
  };
}

function mapStateToProps(state: RootState) {
  if (state.page === 'keyword') {
    return {data: state.keyword.lines};
  } else if (state.page === 'statistics') {
    const statistics = state.statistics;
    const statisticsList = statistics.keywordChart[statistics.currentChart];
    const statisticsData = statisticsList.keyword[statisticsList.current];
    return {data: statisticsData.line};
  } else if (state.page === 'star') {
    return {data: state.star.line};
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ILineChartProps extends Props {
  index?: number;
  type: string;
  title?: string;
  id?: string;
  stateFunc?: (id: string, start: string, end: string) => void;
}

function LineChart({data, index, type, title, id, stateFunc}: ILineChartProps) {
  const chartRef = useRef(null);
  const useData = index ? data[index] : data[0];

  useLayoutEffect(() => {
    const chart = am4core.create(useData.type, am4charts.XYChart);
    chart.data = useData.data;

    const dateAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    dateAxis.dataFields.category = 'date';
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.renderer.fontSize = 12;
    dateAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.fontSize = 12;
    valueAxis.renderer.line.strokeWidth = 2;

    const series = chart.series.push(new am4charts.LineSeries());
    // series.name = 'Value';
    series.stroke = am4core.color('#CDA2AB');
    series.strokeWidth = 3;
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'date';
    series.tooltipText = '{categoryX} :[bold] {valueY}[/]';

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color('#fff');
    bullet.circle.strokeWidth = 2;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = type === 'star' ? 'zoomX' : 'none';
    if (type === 'star') {
      chart.cursor.events.on('zoomended', function (e) {
        const range = e.target.xRange;

        const calculate = () => {
          const axis = e.target.chart.xAxes.getIndex(0);
          const from = axis.getPositionLabel(axis.toAxisPosition(range.start));
          const to = axis.getPositionLabel(axis.toAxisPosition(range.end));
          stateFunc(id, from.slice(0, 10), to.slice(0, 10));
        };
        range !== undefined ? calculate() : alert('Select Again');
      });
      chart.zoomOutButton.events.on('hit', () => {
        const today = new Date();
        const end = today.toJSON().slice(0, 10);
        today.setDate(today.getDate() - 50);
        const start = today.toJSON().slice(0, 10);
        stateFunc(id, start, end);
        console.log('out');
      });
    }

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [useData, index, type, id, stateFunc]);

  return (
    <Container type={type}>
      {type === 'keyword' && (
        <TitleContainer>
          <Title>{title}</Title>
          <Title>{useData.type}</Title>
        </TitleContainer>
      )}

      <LineChartContainer id={useData.type} />
    </Container>
  );
}

export default connector(LineChart);
