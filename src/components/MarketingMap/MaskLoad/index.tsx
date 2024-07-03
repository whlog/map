import React from 'react';
import { Spin } from 'antd';

const MaskLoad:React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      <Spin />
    </div>
  );
};

export default MaskLoad