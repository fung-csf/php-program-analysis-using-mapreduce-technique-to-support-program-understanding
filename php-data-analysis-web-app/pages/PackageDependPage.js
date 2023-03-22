import React, { useState } from "react";

import { FaRegCircle } from "react-icons/fa";
import PackageLvlDependency from "../components/PackageLvlDependency";

import { Row, Col, Card, List, Statistic, Space } from "antd";

function PackageDependPage() {
  const [nodes, setNodes] = useState(0);
  const [edges, setEdges] = useState(0);

  function getGraphData(input) {
    const [node, edge] = input;
    setNodes(node);
    setEdges(edge);
  }

  const data = [
    <h4 style={{ color: "red" }}>
      {" "}
      <FaRegCircle style={{ color: "red" }} /> Package
    </h4>
  ];

  return (
    <div>
      <Row gutter={10}>
       
      </Row>

      <Row gutter={16}>
        <Col span={20}>
          <Card title="Package-Level Dependency">
            <PackageLvlDependency graphData={getGraphData} />
          </Card>
        </Col>
        <Col span={4}>
          <Card title="Legend" bodyStyle={{ height: "554px" }}>
            <List
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>

        <Space size={40}>
          <Statistic title="Nodes" value={nodes} />
          <Statistic title="Edges" value={edges} />
        </Space>
      </Row>
    </div>
  );
}

export default PackageDependPage;
