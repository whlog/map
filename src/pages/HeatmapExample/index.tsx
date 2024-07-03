import React, { useRef, useState } from "react";
import { Space } from "antd";
import { useRequest } from "ahooks";
import MapContainer from "./MapContainer";
import TopFilterForm from "@/components/MarketingMap/TopFilterForm";
import Sidebar from "@/components/MarketingMap/Sidebar";
import MaskLoad from "@/components/MarketingMap/MaskLoad";
import IntervalCard from "@/components/MarketingMap/IntervalCard";
import { heatmap, store, gridmap, options } from "./data.json";
import useMap from "./useMap";
import styles from "./index.module.less";
import StatisticsOverview from "./StatisticsOverview";
import UserProfile  from "./UserProfile"
// 
const initialValue = {
  region: "a001",
  subregion: "b001",
  city: "c001",
  store: "d001",
  areaRange: 10,
  brand: "fengshen",
};

const fetchData = (): Promise<any> => {
  return Promise.all([
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(heatmap);
      }, 300);
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(store);
      }, 300);
    }),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(gridmap);
      }, 300);
    }),
  ]);
};

const fetchOptios = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(options);
    }, 300);
  });

const OverallAnalysis: React.FC = () => {
  const { data, run, loading } = useRequest(() => fetchData());
  const [codeNameMap, setCodeNameMap] = useState({});
  const options = useRequest(fetchOptios);
  const mapRef = useRef<any>(null);

  const { status, onRenderingCompleted } = useMap(data);

  const handleSubmit = (_: any, codeNameMap: React.SetStateAction<{}>) => {
    run();
    setCodeNameMap({ ...codeNameMap });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_wrap}>
        <TopFilterForm
          initialValue={initialValue}
          onSubmit={handleSubmit}
          data={options.data || []}
        />
      </div>
      <Sidebar
        items={[
          {
            key: "1",
            label: "统计概况",
            children: <StatisticsOverview codeNameMap={codeNameMap} />,
          },
          { key: '2', label: '用户画像', children: <UserProfile /> },
        ]}
      />
      {(loading || options.loading) && <MaskLoad />}
      {status ? (
        <div className={styles.interval_card}>
          <IntervalCard />
        </div>
      ) : (
        <Space size={6} direction="vertical" className={styles.lattice_card}>
          <Space size={12}>
            <span style={{ padding: "0 8px", background: "#c6032a" }}></span>
            <span>仅在本店做过售后</span>
          </Space>
          <Space size={12}>
            <span style={{ padding: "0 8px", background: "#5f3a7b" }}></span>
            <span>在本店和其他店做过售后</span>
          </Space>
          <Space size={12}>
            <span style={{ padding: "0 8px", background: "#076ad1" }}></span>
            <span>未在本店做过售后</span>
          </Space>
          <span>
            注:同种颜色的深浅程度代表不同的用户聚集密度，颜色越深代表用户密度越大
          </span>
        </Space>
      )}
      <MapContainer
        plugins={["AMap.HeatMap"]}
        onRenderingCompleted={onRenderingCompleted}
        ref={mapRef}
      />
    </div>
  );
};

export default OverallAnalysis;
