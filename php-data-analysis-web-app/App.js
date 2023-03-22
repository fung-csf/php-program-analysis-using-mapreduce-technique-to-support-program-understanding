import React from "react";

import { Row, Col, Card, Tabs, List } from "antd";
import "@antv/graphin/dist/index.css";
import "@antv/graphin-components/dist/index.css";
import FuncDependPage from "./pages/FuncDependPage";
import ClassDependPage from "./pages/ClassDependPage";
import PackageDependPage from "./pages/PackageDependPage";
import Metrics from "./pages/Metrics";

import { useDispatch, useSelector } from "react-redux";
const { TabPane } = Tabs;

export default () => {
  const { disableGraph } = useSelector((state) => state.counter);

  return (
    <div>
      <Tabs tabPosition={"left"}>
        <TabPane tab="Metrics" key="1">
          <Metrics />
        </TabPane>
        <TabPane tab="Functional Dependency" key="2" disabled={disableGraph}>
          <FuncDependPage />
        </TabPane>
        <TabPane tab="Class-Level Dependency" key="3" disabled={disableGraph}>
          <ClassDependPage />
        </TabPane>
        <TabPane tab="Package-Level Dependency" key="4" disabled={disableGraph}>
          <PackageDependPage />
        </TabPane>
      </Tabs>
    </div>
  );
};
