import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart as _LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Loadable from '../Loadable';

echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  _LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const LineChart: React.FC<any> = ({ xAxis, series, loading }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && xAxis) {
      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsCoreOption = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          bottom: 0,
        },
        grid: {
          left: 0,
          right: 20,
          top: 10,
          bottom: 35,
          containLabel: true, // 如果有需要包含坐标轴标签，可以设置此项
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series,
      };
      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }

    return;
  }, [chartRef.current, xAxis]);

  return (
    <div style={{ width: '100%', height: 215, position: 'relative' }}>
      <Loadable loading={loading}/>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default LineChart;
