import React, {useRef, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import {RootState} from '../../store/store';

const LineChartContainer = styled.div`
  height: 100%;
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
  if (ownProps.type === 'keyword') {
    return {
      states: {data: [state.keyword.lines[state.keyword.currentChart]]},
    };
  } else if (ownProps.type === 'statistics') {
    return {
      states: {
        data:
          state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ].line,
      },
    };
  } else if (ownProps.type === 'star') {
    return {states: {data: state.star.line}};
  } else if (ownProps.type === 'predict') {
    return {states: {data: state.predict.lines}};
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ILineChartProps extends Props {
  type: string;
  id?: string;
  stateFunc?: (id: string, start: string, end: string) => void;
}

function LineChart({states, type, id, stateFunc}: ILineChartProps) {
  const chartRef = useRef(null);
  const useData = states.data[0];
  const unit = useData.type === '인기도 추이' ? '%' : '건';
  useLayoutEffect(() => {
    let chart = am4core.create(useData.type, am4charts.XYChart);
    chart.data = useData.data;
    if (useData.data.length > 0) {
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
      series.stroke = am4core.color('#d10909');
      series.strokeWidth = 3;
      series.dataFields.valueY = 'value';
      series.dataFields.categoryX = 'date';

      series.tooltipHTML = `<div style="padding:10px;"><div style="font-size:17px;margin-bottom:5px;">{value}${unit}</div><span style="font-size:16px;color:#999;">{date}</span></div>`;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#fff');
      series.tooltip.background.strokeWidth = 2;
      series.tooltip.background.stroke = am4core.color('#d10909');
      series.tooltip.label.fill = am4core.color('#222');

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#d10909');
      bullet.circle.fill = am4core.color('#fff');
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
        });
      }
    } else {
      chart.dispose();
      chartRef.current = null;
    }
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [id, stateFunc, type, unit, useData.data, useData.type]);

  return useData.data.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
      <span id={useData.type} />
    </ErrorContainer>
  ) : (
    <LineChartContainer id={useData.type} />
  );
}

export default connector(LineChart);
