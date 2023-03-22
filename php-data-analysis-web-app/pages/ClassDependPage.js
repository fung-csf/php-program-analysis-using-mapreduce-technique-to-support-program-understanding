import React, { useState } from "react";
import { BorderOutlined } from "@ant-design/icons";
import { FaRegCircle } from "react-icons/fa";
import ClassLvlDependency from "../components/ClassLvlDependency";

import { Row, Col, Card, List, Statistic, Space } from "antd";

function ClassDependPage() {
  const [nodes, setNodes] = useState(0);
  const [edges, setEdges] = useState(0);

  function getGraphData(input) {
    const [node, edge] = input;
    setNodes(node);
    setEdges(edge);
  }
  const data = [
    <h4 style={{ color: "#1f35a3" }}>
      {" "}
      <FaRegCircle style={{ color: "#1f35a3", height: 14 }} /> Class
    </h4>
  ];

  return (
    <div>
      <Row gutter={10}>
        
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <Card title=" Class-Level Dependency">
            <ClassLvlDependency graphData={getGraphData} />
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

export default ClassDependPage;
