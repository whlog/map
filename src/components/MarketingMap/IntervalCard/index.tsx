import React from 'react';
import { Typography, Space } from 'antd';

const colors = ['#0000ff', '#64f940', '#ffea00', '#fd3131'];

const IntervalCard: React.FC = () => {
  return (
    <Space size={6} direction="vertical">
      <Typography.Text style={{ color: '#fff' }}>常驻车辆数（台）</Typography.Text>
      <Space size={12}>
        <span style={{ padding: '0 12px', borderRadius: 4, background: colors[3] }}></span>
        <span style={{ color: '#fff' }}>{'>'}（含）80</span>
      </Space>
      <Space size={12}>
        <span style={{ padding: '0 12px', borderRadius: 4, background: colors[2] }}></span>
        <span style={{ color: '#fff' }}>50（含）~80</span>
      </Space>
      <Space size={12}>
        <span style={{ padding: '0 12px', borderRadius: 4, background: colors[1] }}></span>
        <span style={{ color: '#fff' }}>20（含）~50</span>
      </Space>
      <Space size={12}>
        <span style={{ padding: '0 12px', borderRadius: 4, background: colors[0] }}></span>
        <span style={{ color: '#fff' }}>{'<'}20</span>
      </Space>
    </Space>
  );
};

export default IntervalCard;
