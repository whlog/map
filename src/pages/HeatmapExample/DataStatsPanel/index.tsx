import { Tabs } from "antd";
import StatisticsOverview from "./StatisticsOverview";
import UserProfile from "./UserProfile";
import "./index.less";

const Tab = ({ text }: { text: string }): React.ReactNode => (
  <span style={{ padding: "0 16px", fontSize: 18, margin: 0 }}>{text}</span>
);

const DataStatsPanel = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "white",
        marginBottom: 12,
        minWidth: 520,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={0}
        tabBarStyle={{
          fontWeight: 600,
          color: "#aaa",
          margin: 0,
        }}
      >
        <Tabs.TabPane
          style={{ height: "calc(100vh - 76px)", overflow: "auto" }}
          tab={<Tab text="统计概况" />}
          key="1"
        >
          <StatisticsOverview />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<Tab text="用户画像" />}
          style={{ height: "calc(100vh - 76px)", overflow: "auto" }}
          key="2"
        >
          <UserProfile />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default DataStatsPanel;
