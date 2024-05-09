import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart as _PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  LegendComponent,
  _PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const data = [
  { value: 335, name: "直接访问" },
  { value: 310, name: "邮件营销" },
  { value: 234, name: "联盟广告" },
  { value: 135, name: "视频广告" },
  { value: 1048, name: "搜索引擎" },
];

const PieChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表
      const chartInstance = echarts.init(chartRef.current);

      // 配置项类型定义
      const option: echarts.EChartsCoreOption = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: "0%",
          align: "auto",
          icon: "circle",
          itemWidth: 6,
          top: "center",
          formatter: (name: string) => {
            const value = data.filter((item) => item.name === name)[0]?.value;
            return `{a|${name}} {b|${Math.round(
              (value / data.reduce((acc, cur) => acc + cur.value, 0)) * 100
            )}%} {c|${value}}`;
          },
          textStyle: {
            rich: {
              a: {
                width: 140,
              },
              b: {
                width: 30,
                align:'right',
                // color: '#bbb'
              },
              c: {
                width: 50,
                align:'right',
                // color: '#bbb'
              },
            },
          },
        },

        series: [
          {
            name: "车系分布",
            type: "pie",
            radius: "85%",
            center: ["20%", "50%"],
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
                shadowColor: "rgba(0, 0, 0, 0.5)",
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
  }, []); // 空依赖数组意味着这个effect只在组件挂载和卸载时运行 

  return <div ref={chartRef} style={{ width: "100%", height: "180px" }} />;
};

export default PieChart;
