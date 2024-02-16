import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Table, Card, Typography } from "antd";
import { ColumnsType } from "antd/es/table/interface";

type PrecoTetoParams = {
  descricao: string;
  valor: string;
};

type Entrada = {
  cotacaoAtual: string;
  dividendoYieldMedio: string;
  precoTetoParams: PrecoTetoParams[];
};

type Retorno = {
  descricao: string;
  precoTeto: string;
  margemSeguranca: string;
};

function bazin({
  cotacaoAtual,
  dividendoYieldMedio,
  precoTetoParams,
}: Entrada): Retorno[] {
  const numberCotacaoAtual = Number(cotacaoAtual);
  const numberDividendoYieldMedio = Number(dividendoYieldMedio) / 100;

  return precoTetoParams.map(({ descricao, valor }) => {
    const dividendoMedioAnual = numberCotacaoAtual * numberDividendoYieldMedio;
    const numberValor = Number(valor) / 100;
    const precoTeto = dividendoMedioAnual / numberValor;
    const margemSeguranca =
      (dividendoMedioAnual / numberValor / numberCotacaoAtual - 1) * 100;
    return {
      descricao,
      precoTeto: precoTeto.toFixed(2),
      margemSeguranca: margemSeguranca.toFixed(2),
    };
  });
}

const columns: ColumnsType<any> = [
  {
    title: "Descrição",
    dataIndex: "descricao",
    key: "descricao",
  },
  {
    title: "Preço Teto",
    dataIndex: "precoTeto",
    key: "precoTeto",
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

const initialState = {
  cotacaoAtual: "",
  dividendoYieldMedio: "",
  precoTetoParams: [
    { descricao: "Preço teto com DY de 10%", valor: "10" },
    { descricao: "Preço teto com DY de 8%", valor: "8" },
    { descricao: "Preço teto com DY de 7%", valor: "7" },
    { descricao: "Preço teto com DY de 6%", valor: "6" },
  ], // Adiciona um item inicial vazio
};

export const FormBazin: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    form.setFieldsValue(initialState);
  }, [form]);

  const onFinish = (values: Entrada) => {
    setData(bazin(values));
  };

  return (
    <Row justify="center" style={{ padding: 8 }}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Row justify="center" gutter={[8, 8]}>
          <Col span={24}>
            <Card title={"Calculadora de Preço teto Bazin"}>
              <Row justify={"center"}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item
                      label="Cotação Atual (R$)"
                      name="cotacaoAtual"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira a cotação atual!",
                        },
                      ]}
                    >
                      <Input
                        prefix="R$"
                        type="number"
                        step="1"
                        placeholder="Preço da ação, exemplo: 10,99"
                      />
                    </Form.Item>

                    <Form.Item
                      tooltip="This is a required field"
                      label="Dividend Yield Médio (%)"
                      name="dividendoYieldMedio"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira o dividendo yield médio!",
                        },
                      ]}
                    >
                      <Input
                        suffix="%"
                        type="number"
                        step="1"
                        placeholder="DY médio, exemplo: 8,86"
                      />
                    </Form.Item>

                    <Form.Item label="Preço Teto Params">
                      <Form.List name="precoTetoParams">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field) => (
                              <Row gutter={8} key={field.key}>
                                <Col span={16}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "descricao"]}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Por favor, insira a descrição!",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Descrição" disabled />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "valor"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Por favor, insira o valor!",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="number"
                                      step="1"
                                      placeholder="Percentual"
                                      suffix={"%"}
                                      onChange={(e) => {
                                        const descricao = `Preço teto com DY de ${e.target.value}%`;
                                        form.setFieldsValue({
                                          precoTetoParams: [
                                            ...form
                                              .getFieldValue("precoTetoParams")
                                              .map((item: any, index: any) =>
                                                index === field.key
                                                  ? { ...item, descricao }
                                                  : item
                                              ),
                                          ],
                                        });
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={2}>
                                  <Button
                                    danger
                                    onClick={() => remove(field.name)}
                                  >
                                    -
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block>
                                + Adicionar
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Calcular
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
          {data && (
            <Col span={24}>
              <Card>
                <Row>
                  <Col span={24}>
                    <Table
                      dataSource={data}
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
