import React, { useEffect, useState } from 'react';
import { Typography, Button, Space, Table } from 'antd';
import moment from 'moment';
import { useRequest } from 'ahooks';
import { ColumnsType } from 'antd/es/table';
import DateFrom from '@/components/MarketingMap/DateFrom';
import Loadable from '@/components/MarketingMap/Loadable';
import { TIME_MEP } from '@/components/MarketingMap/DateFrom/configs';
import FriendsComparison from './FriendsComparison';
import styles from './panel.module.less';
import { overview } from './data.json';

interface TabelDataType {
  rank: number;
  code: string;
  name: string;
  customerCount: number;
  recentYearCustomerCount: number;
  aftersalesCount: number;
  totalAftersalesCount: number;
}

interface DateType {
  overviewData: {
    [key: string]: number;
  };
  nearbyStore: {
    [key: string]: number;
  };
  nearbyStoreList: TabelDataType[];
}

const fetchData = (): Promise<DateType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(overview);
    }, 5000);
  });
};

const StatisticsOverview: React.FC<{ codeNameMap: { [key: string]: string } }> = ({
  codeNameMap,
}) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { region, subregion, city, store } = codeNameMap;
  const [code, setCode] = useState<null | string>(null);
  const [visible, setVisible] = useState<boolean>(false);
  
  const [{ day, date }, setQuery] = useState({ day: '1', date: moment() });

  const { loading, data } = useRequest(fetchData, {
    refreshDeps: [],
    refreshDepsAction: () => {
      // if (!isNumber(userId)) {
      //   console.log(
      //     `parameter "userId" expected to be a number, but got ${typeof userId}.`,
      //     userId,
      //   );
      //   return;
      // }
      // run(userId); 
    },
  });

  const showDrawer = (code: string) => {
    setCode(code);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const columns: ColumnsType<TabelDataType> = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 40,
    },
    {
      title: '售后店',
      dataIndex: 'name',
      width: 140,
    },
    {
      className: styles.white_space,
      title: `${TIME_MEP[day]}保客数`,
      dataIndex: 'customerCount',
      width: 70,
    },
    {
      className: styles.white_space,
      title: '保客售后次数',
      dataIndex: 'aftersalesCount',
      width: 60,
    },
    {
      className: styles.white_space,
      title: '总售后次数',
      dataIndex: 'totalAftersalesCount',
      width: 60,
    },
    {
      title: '操作',
      render: ({ code }) => (
        <Button type="link" size="small" onClick={() => showDrawer(code)}>
          与TA对比
        </Button>
      ),
    },
  ];

  // console.log(data?.nearbyStoreList)

  const handleQueryChange = (query: React.SetStateAction<{ day: string; date: moment.Moment }>) => {
    setQuery(query);
  };

  useEffect(() => {
    if (Boolean(data)) {
      setIsFirstLoad(false);
    }
  }, [Boolean(data)]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 8 }}>
      <DateFrom value={{ day, date }} onChange={handleQueryChange} />
      <Loadable isFirstLoad={isFirstLoad} loading={loading}>
        <div className="box">
          <Typography className={styles.title}>
            <Typography.Text strong>
              {region}/{subregion}/{city}/{store}售后整体情况
            </Typography.Text>
            <Button type="link">车辆导出</Button>
          </Typography>
          <Space size={48} style={{ padding: '0 24px' }}>
            <Space direction="vertical" align="center">
              <Typography.Text>{data?.overviewData?.vehicleCount}台</Typography.Text>
              <Typography.Text>售后车辆</Typography.Text>
            </Space>
            <Space direction="vertical" align="center">
              <Typography.Text>{data?.overviewData?.aftersalesCount}次</Typography.Text>
              <Typography.Text>售后车次</Typography.Text>
            </Space>
            <Space direction="vertical" align="center">
              <Typography.Text>{data?.overviewData?.customerCount}台</Typography.Text>
              <Typography.Text>{TIME_MEP[day]}有效保客数</Typography.Text>
            </Space>
          </Space>
        </div>
        <div className="box">
          <Typography className={styles.title}>
            <Typography.Text strong>附件有哪些有商</Typography.Text>
          </Typography>
          <Space size={48} style={{ padding: '0 24px' }}>
            <Space direction="vertical" align="center">
              <Typography.Text>{data?.nearbyStore?.storeCount}家</Typography.Text>
              <Typography.Text>附近售后店</Typography.Text>
            </Space>
            <Space direction="vertical" align="center">
              <Typography.Text>{data?.nearbyStore?.vehicleCount}台</Typography.Text>
              <Typography.Text>车辆保有量</Typography.Text>
            </Space>
          </Space>
        </div>
        <div className="box">
          <Typography className={styles.title}>
            <Typography.Text strong>友商店铺统计</Typography.Text>
          </Typography>
          <Table
            size="small"
            columns={columns}
            dataSource={data?.nearbyStoreList}
            bordered
            pagination={false}
            scroll={{ x: 'max-content' }}
            rowKey="code"
          />
        </div>
        {code && <FriendsComparison visible={visible} code={code} onClose={onClose} />}
      </Loadable>
    </div>
  );
};

export default StatisticsOverview;
