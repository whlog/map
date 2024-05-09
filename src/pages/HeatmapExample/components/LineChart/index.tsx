import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart as _LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  _LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsCoreOption = {
        tooltip: {
          trigger: "axis",
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
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "广州风日",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
          {
            name: "我的专营店",
            data: [620, 232, 501, 334, 190, 330, 132],
            type: "line",
            smooth: true,
          },
        ],
      };
      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [chartRef.current]);

  return <div ref={chartRef} style={{ width: "100%", height: 215 }} />;
};

export default LineChart;
