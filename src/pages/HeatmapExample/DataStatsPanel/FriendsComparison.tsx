import React from "react";
import { Typography, Drawer, Card, Row, Select, Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DateFrom from "../components/DateFrom";
import LineChart from "../components//LineChart";
import Loadable from "../components/Loadable";
import CircularChart from "../components/CircularChart";

const FriendsComparison: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  return (
    <Drawer
      title="与友商对比"
      placement="right"
      onClose={onClose}
      visible={visible}
      width="100%"
      getContainer={false}
      style={{ position: "absolute" }}
      mask={false}
      closeIcon={<ArrowLeftOutlined />}
      bodyStyle={{ padding: 12 }}
    >
      <DateFrom 
      // onChange={console.log}
      />

      <Card
        style={{ marginTop: 12 }}
        headStyle={{
          background: "#fafafa",
          textAlign: "center",
        }}
        size="small"
        title={<Typography.Text strong>售后流量对比</Typography.Text>}
      >
        <Row align="middle" justify="space-between">
          <div>
            <Typography.Text>统计时间：2021.01.01 ~ 2021.01.01</Typography.Text>
            <Tabs
              defaultActiveKey="1"
              tabBarGutter={0}
              size="small"
              tabBarStyle={{
                color: "#aaa",
                margin: 0,
                padding: 0,
              }}
              // onChange={console.log}
            >
              <Tabs.TabPane
                tab={<span style={{ padding: "0 8px" }}>日趋势</span>}
                key="day"
              />
              <Tabs.TabPane
                tab={<span style={{ padding: "0 8px" }}>周趋势</span>}
                key="week"
              />
              <Tabs.TabPane
                tab={<span style={{ padding: "0 8px" }}>月趋势</span>}
                key="month"
              />
            </Tabs>
          </div>

          <Select defaultValue="保客数" style={{ width: 140 }}>
            <Select.Option value="保客数">保客数</Select.Option>
            <Select.Option value="保客售后次数">保客售后次数</Select.Option>
            <Select.Option value="售后收入（元）">售后收入（元）</Select.Option>
          </Select>
        </Row>

        <Loadable firstLoading={false} loading={false}>
          <LineChart />
        </Loadable>
      </Card>

      <Card
        style={{ marginTop: 12 }}
        headStyle={{
          background: "#fafafa",
          textAlign: "center",
        }}
        size="small"
        title={<Typography.Text strong>售后项目对比</Typography.Text>}
      >
        <CircularChart />
      </Card>

      <Card
        style={{ marginTop: 12 }}
        headStyle={{
          background: "#fafafa",
          textAlign: "center",
        }}
        size="small"
        title={<Typography.Text strong>售后车系对比</Typography.Text>}
      >
        <CircularChart />
      </Card>
    </Drawer>
  );
};

export default FriendsComparison;
