import { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Table,
} from "antd";
import DateFrom from "../components/DateFrom";
import FriendsComparison from "./FriendsComparison";

const StatisticsOverview = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "排名",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "售后店",
      dataIndex: "name",
      key: "key",
      width: 145,
    },
    {
      title: "近一年保客数",
      dataIndex: "address",
      key: "address",
      width: 70,
    },
    {
      title: "保客售后次数",
      dataIndex: "address",
      width: 120,
    },
    {
      title: "总售后次数",
      dataIndex: "address",
      width: 100,
    },
    {
      title: "操作",
      render: () => (
        <Button type="link" size="small" onClick={showDrawer}>
          与TA对比
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "武汉1号专营店",
      address: 30,
    },
    {
      key: "2",
      name: "武汉2号专营店",
      address: 30,
    },
    {
      key: "3",
      name: "武汉3号专营店",
      address: 30,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <DateFrom />

      <div className="box">
        <Typography className="title">
          <Typography.Text strong>xxx/xxx/xxx/xxx售后整体情况</Typography.Text>
          <Button type="link">车辆导出</Button>
        </Typography>

        <Space size={48} style={{ padding: "0 24px" }}>
          <Space direction="vertical" align="center">
            <Typography.Text>35台</Typography.Text>
            <Typography.Text>售后车辆</Typography.Text>
          </Space>
          <Space direction="vertical" align="center">
            <Typography.Text>57次</Typography.Text>
            <Typography.Text>售后车次</Typography.Text>
          </Space>
          <Space direction="vertical" align="center">
            <Typography.Text>31台</Typography.Text>
            <Typography.Text>近一年有效保客数</Typography.Text>
          </Space>
        </Space>
      </div>

      <div className="box">
        <Typography className="title">
          <Typography.Text strong>附件有哪些有商</Typography.Text>
        </Typography>
        <Space size={48} style={{ padding: "0 24px" }}>
          <Space direction="vertical" align="center">
            <Typography.Text>24家</Typography.Text>
            <Typography.Text>附近售后店</Typography.Text>
          </Space>
          <Space direction="vertical" align="center">
            <Typography.Text>2345台</Typography.Text>
            <Typography.Text>车辆保有量</Typography.Text>
          </Space>
        </Space>
      </div>

      <div className="box">
        <Typography className="title">
          <Typography.Text strong>友商店铺统计</Typography.Text>
        </Typography>

        <Table
          size="small"
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          scroll={{ x: 520 }}
        />
      </div>

      <FriendsComparison visible={visible} onClose={onClose} />
    </div>
  );
};

export default StatisticsOverview;
