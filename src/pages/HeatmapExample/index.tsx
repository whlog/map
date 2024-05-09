import { useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";

import TopFilterForm from "./components/TopFilterForm";
import MapContainer from "./MapContainer";
// import DataStatsPanel from "./DataStatsPanel";

const getData = async () => await (await fetch("/api/data")).json();

function HeatmapExample() {
  const [open, setOpen] = useState(false);
  const { data, error, loading, run } = useRequest(getData);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1,
          width: "80%",
        }}
      >
        <TopFilterForm onSubmit={run}/>
      </div>

      <Button
        style={{
          position: "absolute",
          top: 42,
          right: 530,
          zIndex: 3,
          transition: "transform .5s",
          boxSizing: "border-box",
          transform: `translateX(${open ? "0" : "520"}px)`,
        }}
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 24,
          zIndex: 2,
          width: `${open ? "520" : "0"}px`,
          transition: "width .5s",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* <DataStatsPanel /> */}
      </div>

      <MapContainer data={data} />
    </div>
  );
}

export default HeatmapExample;
