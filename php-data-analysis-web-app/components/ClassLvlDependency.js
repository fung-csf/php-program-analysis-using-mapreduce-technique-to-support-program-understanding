import React, { useState, useEffect } from "react";
import Graphin, { Behaviors, GraphinContext, Utils } from "@antv/graphin";
import { Row, Col, Card } from "antd";
import {
  MiniMap,
  Legend,
  TableMode,
  Statistic
} from "@antv/graphin-components";
import "@antv/graphin/dist/index.css";
import "@antv/graphin-components/dist/index.css";
import { useDispatch, useSelector } from "react-redux";

function ClassLvlDependency(props) {
  const { functionGraphData, classGraphData, packageGraphData } = useSelector(
    (state) => state.counter
  );

  const datatemp = {
    nodes: [],
    combos: [],
    edges: []
  };

  const [data, setData] = useState(datatemp);

  useEffect(() => {
    setData(JSON.parse(classGraphData));
  }, [classGraphData]);

  data.nodes.forEach((node) => {
    node.data = {
      type: "function"
    };

    node.style = {
      label: {
        value: node.id
      },
      keyshape: {
        size: 30,
        stroke: "#1f35a3",
        fill: "#1f35a3",
        fillOpacity: 0.2
      }
    };
  });

  data.edges.forEach((edge) => {
    edge.style = {
      keyshape: {
        stroke: "#8566cc"
      }
    };
  });

  const CustomComponents = () => {
    // As long as the components wrapped in Graphin, you can obtain graph instances and apis provided by Graphin through Context
    const { graph, apis } = React.useContext(GraphinContext);

    graph.on("combo:mouseenter", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", true);
    });

    graph.on("combo:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", false);
    });

    graph.on("canvas:click", (evt) => {
      graph.getCombos().forEach((combo) => {
        graph.clearItemStates(combo);
      });
    });
    return null;
  };

  const {
    DragCanvas,
    ZoomCanvas,
    DragNode,
    ActivateRelations,
    FitView,
    DragCombo
  } = Behaviors;

  var noOfNodes = data.nodes.length;
  var noOfEdges = data.edges.length;

  return (
    <div>
      <Graphin
        data={data}
        layout={{ type: "dagre" }}
        modes={{ default: ["collapse-expand-combo"] }}
      >
        <ZoomCanvas />
        <DragNode disabled />
        <DragCombo />
        <DragCanvas />
        <ActivateRelations />
        <FitView />
        <MiniMap />

        <CustomComponents />
      </Graphin>
      <div onLoad={props.graphData([noOfNodes, noOfEdges])}> </div>
    </div>
  );
}

export default ClassLvlDependency;
