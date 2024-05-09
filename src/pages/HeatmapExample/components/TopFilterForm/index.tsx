import React from "react";
import { Button, Form, Select, Row, Col } from "antd";

const FilterForm: React.FC<any> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={12}>
        <Col span={2}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="大区">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="小区">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="城市">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="专营店">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="区域范围">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="品牌">
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Form.Item style={{ width: 140 }}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 12 }} htmlType="button">
            重置
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default FilterForm;
