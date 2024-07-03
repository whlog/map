import React, { useState } from 'react';
import moment from 'moment';
import { useRequest } from 'ahooks';
import { Typography, Button, Table } from 'antd';
import PieChart from '@/components/MarketingMap/PieChart';
import DateFrom from '@/components/MarketingMap/DateFrom';
import CustomCard from '@/components/MarketingMap/CustomCard';
import { TIME_MEP } from '@/components/MarketingMap/DateFrom/configs';
import { mapper } from '@/utils/marketingMap/utils';
import { resident, distribution } from './data.json';
import styles from './panel.module.less';

const fetchData = (): Promise<any> =>
  Promise.all([
    new Promise(resolve => {
      setTimeout(() => {
        resolve(resident);
      }, 2000);
    }),
    new Promise(resolve => {
      setTimeout(() => {
        resolve(distribution);
      }, 2000);
    }),
  ]);

const UserProfile = () => {
  const { data, loading } = useRequest(fetchData);

  const [{ day, date }, setQuery] = useState({ day: '1', date: moment() });

  const handleQueryChange = (query: React.SetStateAction<{ day: string; date: moment.Moment }>) => {
    setQuery(query);
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: '常驻地',
      dataIndex: 'resident',
      key: 'resident',
      render: (text: string) => (
        <Button size="small" type="link">
          {text}
        </Button>
      ),
    },
    {
      title: `${TIME_MEP[day]}保客数`,
      dataIndex: 'recentYearCustomerCount',
      key: 'recentYearCustomerCount',
    },
    {
      title: '占比',
      dataIndex: 'percent',
      key: 'percent',
      render: (text: number) => `${text} %`,
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <DateFrom value={{ day, date }} onChange={handleQueryChange} />
      <div>
        <Typography className={styles.title} style={{ paddingBottom: 0 }}>
          <Typography.Text strong>售后车辆常驻地排名</Typography.Text>
        </Typography>

        <Typography style={{ textAlign: 'right', paddingRight: 24 }}>
          <Typography.Text>总保客数：{data?.[0]?.totalCustomerCount || 0}</Typography.Text>
        </Typography>
        <Table
          size="small"
          columns={columns}
          dataSource={data?.[0]?.list}
          bordered
          rowKey="rank"
          pagination={false}
          loading={loading}
          // footer={() => (
          //   <div className={styles.table_footer}>
          //     <Button type="link">查看更多</Button>
          //   </div>
          // )}
        />
      </div>

      <div>
        <Typography className={styles.title}>
          <Typography.Text strong>客户人群分布</Typography.Text>
        </Typography>
        <CustomCard
          loading={loading}
          title={<Typography.Text strong>车系分布</Typography.Text>}
          extra={<Typography.Text style={{ fontSize: 12 }}>售后（次）</Typography.Text>}
        >
          <PieChart
            data={data?.[1]?.seriesData.map(
              (item: { count: number; percent: string; series: string }) => ({
                value: item.count,
                percent: item.percent + '%',
                name: item.series,
              }),
            )}
          />
        </CustomCard>

        <CustomCard
          loading={loading}
          style={{ marginTop: 12 }}
          title={<Typography.Text strong>售后项目分布</Typography.Text>}
          extra={<Typography.Text style={{ fontSize: 12 }}>售后（次）</Typography.Text>}
        >
          <PieChart
            data={data?.[1]?.projectData.map(
              (item: { count: number; percent: string; type: number }) => ({
                value: item.count,
                percent: item.percent + '%',
                name: mapper[item.type],
              }),
            )}
          />
        </CustomCard>
      </div>
    </div>
  );
};

export default UserProfile;
