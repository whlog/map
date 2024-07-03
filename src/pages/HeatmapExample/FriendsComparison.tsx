import React, { useMemo, useState } from "react";
import { useRequest } from "ahooks";
import moment from "moment";
import { Typography, Drawer, Row, Select, Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DateFrom from "@/components/MarketingMap/DateFrom";
import LineChart from "@/components/MarketingMap/LineChart";
import CircularChart from "@/components/MarketingMap/CircularChart";
import CustomCard from "@/components/MarketingMap/CustomCard";
import { mapper } from "@/utils/marketingMap/utils";
import { linechart, project } from "./data.json";

const fetchLineData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(linechart);
    }, 1000);
  });
const fetchCircularData = (): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(project);
    }, 1000);
  });

const toData = (
  data: { count: number; type: number; series: string }[],
  is = false
) => {
  if (!is) {
    return data.map((item) => ({ value: item.count, name: mapper[item.type] }));
  } else {
    return data.map((item) => ({ value: item.count, name: item.series }));
  }
};

const LineCard: React.FC<{
  date: moment.Moment | null;
  day: string;
  code: string;
}> = ({ date, day, code }) => {
  const [value, setValue] = useState("customerData");

  const { data, run, loading } = useRequest(fetchLineData, {
    refreshDeps: [date, code],
    defaultParams: [date, code],
    refreshDepsAction: () => {
      run(date, code);
    },
  });

  const [xAxis, store, toStore] = useMemo(() => {
    if (!data) return [];

    const result = data?.[value]?.reduce(
      (cur: any[], prev: { date: string; store: number; toStore: number }) => {
        cur[0] = [...cur[0], prev.date];
        cur[1] = [...cur[1], prev.store];
        cur[2] = [...cur[2], prev.toStore];

        return cur;
      },
      [[], [], []]
    );

    return result;
  }, [data, value]);

  return (
    <CustomCard
      style={{ marginTop: 12 }}
      title={<Typography.Text strong>售后流量对比</Typography.Text>}
    >
      <Row align="middle" justify="space-between">
        <div>
          <Typography.Text>
            统计时间：
            {moment(date).subtract(day, "month")?.format("YYYY-MM-DD")} ~{" "}
            {date?.format("YYYY-MM-DD")}
          </Typography.Text>
          <Tabs
            defaultActiveKey="0"
            tabBarGutter={0}
            size="small"
            tabBarStyle={{
              color: "#aaa",
              margin: 0,
              padding: 0,
            }}
          >
            <Tabs.TabPane
              tab={<span style={{ padding: "0 8px" }}>日趋势</span>}
              key="0"
            />
            <Tabs.TabPane
              tab={<span style={{ padding: "0 8px" }}>周趋势</span>}
              key="1"
            />
            <Tabs.TabPane
              tab={<span style={{ padding: "0 8px" }}>月趋势</span>}
              key="2"
            />
          </Tabs>
        </div>
        <Select value={value} onChange={setValue} style={{ width: 140 }}>
          <Select.Option value="customerData">保客数</Select.Option>
          <Select.Option value="countData">保客售后次数</Select.Option>
          <Select.Option value="incomeData">售后收入（元）</Select.Option>
        </Select>
      </Row>
      <LineChart
        loading={loading}
        xAxis={xAxis}
        series={[
          {
            name: "我的专营店",
            data: toStore,
            type: "line",
            smooth: true,
          },
          {
            name: "广州风日",
            data: store,
            type: "line",
            smooth: true,
          },
        ]}
      />
    </CustomCard>
  );
};

const FriendsComparison: React.FC<{
  code: string;
  visible: boolean;
  onClose: () => void;
}> = ({ visible, code, onClose }) => {
  const [{ day, date }, setQuery] = useState({ day: "1", date: moment() });

  const { loading, data } = useRequest(fetchCircularData, {
    refreshDeps: [date, code],
    // defaultParams: [date, code],
    // refreshDepsAction: () => {
    //   run(date, code);
    // },
  });

  const handleQueryChange = (
    query: React.SetStateAction<{ day: string; date: moment.Moment }>
  ) => {
    setQuery(query);
  };

  // ({ store, toStore })=> {
  //   return [
  //     store.map(item=> ({ value: item.count, name: item.type })),
  //     toStore.map(item=> ({ value: item.count, name: item.type })),
  //   ]
  // }

  const projectData = useMemo(() => {
    if (!data?.projectData) return null;
    const { store, toStore } = data.projectData;

    return [
      { name: "我的售后点", data: toData(store) },
      { name: code, data: toData(toStore) },
    ];
  }, [data?.projectData]);

  const seriesData = useMemo(() => {
    if (!data?.seriesData) return null;
    const { store, toStore } = data.seriesData;

    return [
      { name: "我的售后点", data: toData(store, true) },
      { name: code, data: toData(toStore, true) },
    ];
  }, [data?.seriesData]);

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
      <DateFrom value={{ day, date }} onChange={handleQueryChange} />
      <LineCard date={date} day={day} code={code} />
      <CustomCard
        loading={loading}
        style={{ marginTop: 12 }}
        title={<Typography.Text strong>售后项目对比</Typography.Text>}
      >
        <CircularChart data={projectData} />
      </CustomCard>
      <CustomCard
        loading={loading}
        style={{ marginTop: 12 }}
        title={<Typography.Text strong>售后车系对比</Typography.Text>}
      >
        <CircularChart data={seriesData} />
      </CustomCard>
    </Drawer>
  );
};

export default FriendsComparison;

// const fn = () => {
//   return {
//     store : {
//       name: '我的售后店',
//       data: data.store.map(item => ({
//         name: mapper[item.type],
//         value: item.count,
//       })),
//     },
//     toStore: {
//       name: 'A001',
//       data: data.toStore.map(item => ({
//         name: mapper[item.type],
//         value: item.count,
//       })),
//     }
//   }
// };
