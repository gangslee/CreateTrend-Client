import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { RootState } from '../../store/store';

// Component에 사용될 style을 포함한 Element들을 선언
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
      states: { data: [state.keyword.lines[state.keyword.currentChart]] },
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
    return { states: { data: state.star.line } };
  } else if (ownProps.type === 'detail') {
    return { states: { data: state.videoDetail.lines } };
  } else if (ownProps.type === 'predict') {
    return { states: { data: state.predict.lines } };
  }
} // store의 state들을 props로 mapping

const connector = connect(mapStateToProps);
// 해당 Component에 mapStateToProps와 mapDispatchToProps의 props를 넘겨주는 connect 함수를 변수로 선언

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ILineChartProps extends Props {
  type: string;
  id?: string;
  stateFunc?: (id: string, start: string, end: string) => void;
} // 넘겨줄 props와 추가로 요청받을 props를 type화

// 추이 그래프 Component 생성
function LineChart({ states, type, id, stateFunc }: ILineChartProps) {
  const chartRef = useRef(null);
  const useData = states.data[0];
  const unit = useData.type === '인기도 추이' ? '%' : useData.type === '조회수 추이' ? '회' : '건';

  // Component 생성 시 차트 생성 및 기본 설정 진행
  useLayoutEffect(() => {
    let chart = am4core.create(useData.type, am4charts.XYChart);
    chart.data = useData.data;

    // data가 존재 할 경우 chart 생성 및 기본 설정 진행
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

      // StarPresenter의 차트의 경우 drag event를 통해 기간을 설정하는 함수를 추가
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
    } // data가 존재 하지 않을 시 차트 설정 값 제거

    chartRef.current = chart;

    // Component LifeCycle 종료 시 차트 설정 값 제거
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
// connector를 통해 store의 state를 해당 Component의 props로 전달
