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

const series = [
  {
    name: "我的售后店",
    type: "pie",
    radius: ["45%", "70%"],
    center: ["25%", "40%"],
    label: {
      show: true,
      position: "center",
      formatter: ({ value, percent }: any) => {
        return `我的售后店\n${((value / percent) * 100).toLocaleString()}`;
      },
      lineHeight: 18,
    },
  },
  {
    name: "A售后店",
    type: "pie",
    radius: ["45%", "70%"],
    center: ["75%", "40%"],
    label: {
      show: true,
      position: "center",
      formatter: ({ value, percent }: any) => {
        return `我的售后店\n${((value / percent) * 100).toLocaleString()}`;
      },
      lineHeight: 18,
    },
  },
];

const CircularChart: React.FC<any> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current && data) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "item",
          formatter: ({ seriesName, marker, name, value, percent }: any) => {
            return `${seriesName} <br/>${marker} ${name}：${Math.round(
              percent
            )}%     ${value}次`;
          },
        },
        legend: {
          itemGap: 20,
          bottom: 0,
        },
        series: series.map((item, index) => ({
          ...item,
          ...data[index],
        })),
      };
      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }

    return;
  }, [chartRef.current]);

  return <div ref={chartRef} style={{ width: 370, height: 200 }} />;
};

export default CircularChart;
