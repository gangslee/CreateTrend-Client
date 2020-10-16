import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../store/store";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

type containerType = {
  type: string;
};

const WordmapContainer = styled.div`
  height: ${({ type }: containerType) =>
    type === "statistics" ? "100%" : "100%"};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  height: 95%;
`;

const Error = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

interface OwnProps {
  type: string;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  if (ownProps.type === "keyword") {
    return { data: state.keyword.wordmap };
  } else if (ownProps.type === "statistics") {
    return {
      data:
        state.statistics.keywordChart[state.statistics.currentChart].keyword[
          state.statistics.currentKeyword
        ].wordmap,
    };
  } else if (ownProps.type === "star") {
    return {
      data:state.star.wordmap
    };
  }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IWordMapProps extends Props {
  type: string;
}

function WordMap({ data, type }: IWordMapProps) {
  const chartRef = useRef(null);
  useLayoutEffect(() => {
    const chart = am4core.create(
      `${type}-wordmap`,
      am4plugins_forceDirected.ForceDirectedTree
    );
    const series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );
    series.data = [data];

    // Set up data fields
    series.dataFields.value = "value";
    series.dataFields.name = "name";
    series.dataFields.children = "children";
    series.dataFields.color = "color";

    // Add labels
    series.nodes.template.label.text = "{name}";
    // series.nodes.template.label.fill = am4core.color('#000');
    // series.nodes.template.circle.strokeWidth = 4;
    // series.nodes.template.circle.fill = am4core.color('#fff');
    series.nodes.template.outerCircle.strokeWidth = 4;
    series.fontSize = type === "keyword" ? 15 : 12;

    // series.fontWeight = 'bold';
    series.minRadius = type === "star" ? am4core.percent(8) : am4core.percent(6);
    series.maxRadius = type === "star" ? am4core.percent(16) : am4core.percent(13);
    series.nodes.template.tooltipText = "{name}";
    series.nodes.template.label.hideOversized = true;
    series.nodes.template.label.truncate = true;

    series.nodes.template.togglable = false;

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, type]);

  return data.children.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
      <span id={`${type}-wordmap`}></span>
    </ErrorContainer>
  ) : (
    <WordmapContainer id={`${type}-wordmap`} type={type} />
  );
}

export default connector(WordMap);
