import React from "react";
import { FormBazin } from "@/components/FormBazin";
import { Tabs, TabsProps } from "antd";
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
    <>
      <Tabs items={items} style={{ minHeight: "100vh", padding: 8 }} />
    </>
  );
}
