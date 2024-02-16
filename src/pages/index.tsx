import React from "react";
import { FormBazin } from "@/components/FormBazin";
import { Col, Row, Tabs, TabsProps } from "antd";
import { v4 as uuid } from "uuid";
import { FormGraham } from "@/components/FormGraham";

const items: TabsProps["items"] = [
  {
    key: uuid(),
    label: `TETO BAZIN`,
    children: <FormBazin />,
  },
  {
    key: uuid(),
    label: `TETO GRAHAM`,
    children: <FormGraham />,
  },
];

export default function Home() {
  return (
    <Row gutter={[24, 24]} style={{ padding: 12 }} justify={"center"}>
      <Col xs={24} sm={24} md={22} lg={16} xl={16}>
        <Tabs items={items} />
      </Col>
    </Row>
  );
}
