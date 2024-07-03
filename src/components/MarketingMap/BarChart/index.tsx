import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart as _BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, LegendComponent, _BarChart, CanvasRenderer]);

const config = {
  type: 'bar',
  barGap: 5,
  label: {
    show: true,
    position: 'bottom',
    formatter: (params: { seriesName: string }) => params.seriesName,
  },
};

const BarChart: React.FC<any> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && data) {

      const total = data.reduce((cur: number, prev: { data: any[] }) => (cur += prev.data[0]), 0);

      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsCoreOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (props: { seriesName: any; marker: any; percent: any; value: any }[]) => {
            let _html = `<div>2024-05-14</div>`;

            props.forEach(({ seriesName, marker, value }) => {
              _html += `
                <div style="display: flex;align-items: center;">
                  <div style="width: 68px;">${marker} ${seriesName}：</div>
                  <div style="width: 60px; text-align: right;">${value}</div> 
                  <div style="width: 60px; text-align: right;">${Math.round(
                    (value / total) * 100,
                  )}%</div> 
                </div>
              `;
            });

            return _html;
          },
        },
        // color: ['#DE354A', '#fac858', '#91cc75'],
        // color: ['#DE354A', '#DE354A', '#DE354A', '#DE354A'],
        legend: {
          top: 0,
          right: 12,
          // data: ['正常', '流失', '流失挽回'],
        },
        grid: {
          left: 0,
          right: 20,
          top: 30,
          bottom: 0,
          containLabel: true, // 如果有需要包含坐标轴标签，可以设置此项
        },
        xAxis: {
          type: 'category',
          show: false,
          data: ['2024-05-14'],
        },
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: data.map((item: any) => ({
          ...config,
          ...item,
        })),
      };
      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }

    return;
  }, [chartRef.current, data]);

  return <div ref={chartRef} style={{ width: '100%', height: 200 }} />;
};

export default BarChart;
