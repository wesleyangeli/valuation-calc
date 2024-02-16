import { Button, Card, Col, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface EntradaGraham {
  cotacao: string;
  vpa: string;
  lpa: string;
}

interface RetornoGraham {
  graham: {
    valorIntriceco: string;
    margemSeguranca: string;
  }[];
}

const grahamCalc = ({ cotacao, vpa, lpa }: EntradaGraham): RetornoGraham => {
  const lpaValue = Number(lpa);
  const vpaValue = Number(vpa);
  const cotacaoValue = Number(cotacao);

  const valorIntriceco = Math.sqrt(22.5 * lpaValue * vpaValue);
  const margemSeguranca = valorIntriceco / cotacaoValue - 1;

  return {
    graham: [
      {
        valorIntriceco: Number(valorIntriceco).toFixed(2),
        margemSeguranca: Number(margemSeguranca * 100).toFixed(2),
      },
    ],
  };
};

const initialValues = { cotacao: "", vpa: "", lpa: "" };

const tooltips = {
  lpa: `LPA = Lucro por Ação
    Indicador que mostra se a empresa é
    lucrativa. Quando o número é negativo,
    indica que a empresa está operando com
    geração de prejuízo ao invés de lucro.
    Cálculo: lucro líquido / número de ações
    em circulação`,
  vpa: `VPA = Valor Patrimonial por Ação
    Representa quanto vale uma ação da
    empresa em relação a todo seu patrimônio.
    Cálculo: patrimônio líquido / número de
    ações em circulação`,
};

const columns: ColumnsType<any> = [
  {
    title: "Preço justo",
    dataIndex: "valorIntriceco",
    key: "valorIntriceco",
    render: (text: string) => {
      return parseInt(text).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    },
  },
  {
    title: "Margem de Segurança",
    dataIndex: "margemSeguranca",
    key: "margemSeguranca",
    render: (text: string) => {
      return `${text}%`;
    },
  },
];

export const FormGraham: React.FC = () => {
  const [data, setData] = useState<RetornoGraham | null>(null);
  function onFinish(values: any) {
    const valorIntriceco = grahamCalc(values);
    setData(valorIntriceco);
  }

  return (
    <Row justify="center" style={{ padding: 8 }}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Row justify="center" gutter={[8, 8]}>
          <Col span={24}>
            <Card title={"Calculadora Graham"}>
              <Form
                onFinish={onFinish}
                initialValues={initialValues}
                layout="vertical"
              >
                <Form.Item
                  name="cotacao"
                  label={"Cotação"}
                  rules={[
                    { required: true, message: "Por favor, insira a cotação!" },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Preço da ação, exemplo: 10,99"
                  />
                </Form.Item>
                <Form.Item
                  name="vpa"
                  tooltip={tooltips.vpa}
                  label={"VPA"}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o VPA!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Valor patrimônio por ação, exemplo: 7,70"
                  />
                </Form.Item>
                <Form.Item
                  name="lpa"
                  tooltip={tooltips.lpa}
                  label={"LPA"}
                  rules={[
                    { required: true, message: "Por favor, insira o LPA!" },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Lucro por ação, exemplo: 7,99"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Calcular
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          {data && (
            <Col span={24}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Table
                      dataSource={data.graham}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};
