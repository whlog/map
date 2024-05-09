import { Typography, Button, Table, Card } from "antd";
import DateFrom from "../components/DateFrom";
import PieChart from "../components/PieChart";

const columns = [
  {
    title: "排名",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "常驻地",
    dataIndex: "name",
    key: "key",
    render: (text: string) => (
      <Button size="small" type="link">
        {text}
      </Button>
    ),
  },
  {
    title: "近一年保客数",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "占比",
    dataIndex: "address",
    render: (text: number) => `${text} %`,
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

const UserProfile = () => {
  return (
    <div style={{ padding: 8 }}>
      <DateFrom />

      <div>
        <Typography className="title">
          <Typography.Text strong>售后车辆常驻地排名</Typography.Text>
        </Typography>

        <Typography style={{ textAlign: "right", paddingRight: 24 }}>
          <Typography.Text>总保客数：231</Typography.Text>
        </Typography>
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          footer={() => (
            <div className="table_footer">
              <Button type="link">查看更多</Button>
            </div>
          )}
        />
      </div>

      <div>
        <Typography className="title">
          <Typography.Text strong>客户人群分布</Typography.Text>
        </Typography>
        <Card
          headStyle={{
            background: "#fafafa",
            textAlign: "center",
          }}
          size="small"
          title={<Typography.Text strong>车系分布</Typography.Text>}
          extra={
            <Typography.Text style={{ fontSize: 12 }}>
              售后（次）
            </Typography.Text>
          }
        >
          <PieChart />
        </Card>

        <Card
          style={{ marginTop: 12 }}
          headStyle={{
            background: "#fafafa",
            textAlign: "center",
          }}
          size="small"
          title={<Typography.Text strong>售后项目分布</Typography.Text>}
          extra={
            <Typography.Text style={{ fontSize: 12 }}>
              售后（次）
            </Typography.Text>
          }
        >
          <PieChart />
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
