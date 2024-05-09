import React, { ReactNode } from "react";
import { Spin } from "antd";

type Props = {
  firstLoading?: boolean;
  loading: boolean;
  children: ReactNode;
};

const Loadable: React.FC<Props> = ({ firstLoading, loading, children }) => {
  if (firstLoading) {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            backgroundColor: "rgb(255,255,255)",
          }}
        >
          <Spin />
        </div>

        {children}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <Spin />
        </div>

        {children}
      </div>
    );
  }

  return children;
};

export default Loadable;
