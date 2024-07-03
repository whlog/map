import React, { useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart as _PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useDeepCompareEffect } from 'ahooks';

echarts.use([TooltipComponent, LegendComponent, _PieChart, CanvasRenderer, LabelLayout]);

interface Props {
  data: { value: number, name: string, percent: string}[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useDeepCompareEffect(() => {
    if (chartRef.current && data) {
      console.log(data)

      // 初始化图表
      const chartInstance = echarts.init(chartRef.current);

      // 配置项类型定义
      const option: echarts.EChartsCoreOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          right: '0%',
          align: 'auto',
          icon: 'circle',
          itemWidth: 6,
          top: 'center',
          formatter: (name: string) => {
            const res = data.filter(item => item.name === name)[0];
            return `{a|${name}} {b|${res.percent}} {c|${res.value}}`;
          },
          textStyle: {
            rich: {
              a: {
                width: 100,
              },
              b: {
                width: 30,
                align: 'right',
                // color: '#bbb'
              },
              c: {
                width: 40,
                align: 'right',
                // color: '#bbb'
              },
            },
          },
        },

        series: [
          {
            name: '车系分布',
            type: 'pie',
            radius: '80%',
            center: ['22.5%', '50%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      // 设置配置项并渲染图表
      chartInstance.setOption(option);

      // 组件卸载时清理图表实例
      return () => {
        chartInstance.dispose();
      };
    }

    return;
  }, [chartRef.current, data]);

  return <div ref={chartRef} style={{ width: '403px', height: '180px' }} />;
};

export default PieChart;
