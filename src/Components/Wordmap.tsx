import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../store";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

const Container = styled.div`
  display: inline-block;
  width: 700px;
  height: 300px;
`;

function mapStateToProps(state: RootState) {
  return { data: state.keyword.wordmap };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function WordMap({ data }: Props) {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const chart = am4core.create(
      "keyword-wordmap",
      am4plugins_forceDirected.ForceDirectedTree
    );
    const series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );
    series.data = data;
    // Set up data fields
    series.dataFields.value = "value";
    series.dataFields.name = "name";
    series.dataFields.children = "children";

    // Add labels
    series.nodes.template.label.text = "{name}";
    series.fontSize = 12;
    series.minRadius = 20;
    series.maxRadius = 40;

    chartRef.current = chart;
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <Container id="keyword-wordmap" />;
}

export default connector(WordMap);
