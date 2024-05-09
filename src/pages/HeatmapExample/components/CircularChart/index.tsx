import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const CircularChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: ({ seriesName, marker, name, value, percent }: any) => {
            return `${seriesName} <br/>${marker} ${name}：${Math.round(
              percent
            )}%  ${value}次`;
          },
        },
        legend: {
          itemGap: 50,
          bottom: 0,
        },
        series: [
          {
            name: "我的售后店",
            type: "pie",
            radius: ["45%", "70%"],
            center: ["25%", "40%"],
            label: {
              show: true,
              position: "center",
              formatter: `我的售后店\n${(2345).toLocaleString()}`,
              lineHeight: 18,
            },
            data: [
              { value: 40, name: "维修" },
              { value: 33, name: "保养" },
              { value: 28, name: "返修" },
              { value: 22, name: "保修" },
            ],
          },
          {
            name: "A售后店",
            type: "pie",
            radius: ["45%", "70%"],
            center: ["75%", "40%"],
            label: {
              show: true,
              position: "center",
              formatter: `A售后店\n${(2345).toLocaleString()}`,
              lineHeight: 18,
            },
            data: [
              { value: 30, name: "维修" },
              { value: 28, name: "保养" },
              { value: 26, name: "返修" },
              { value: 24, name: "保修" },
            ],
          },
        ],
      };
      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [chartRef.current]);

  return <div ref={chartRef} style={{ width: "100%", height: 200 }} />;
};

export default CircularChart;
