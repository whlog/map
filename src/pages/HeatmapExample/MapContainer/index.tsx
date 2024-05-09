import React, { useEffect, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

const calculateSquareCorners = (
  center: [number, number],
  sideLength = 20000
) => {
  const [lat, lng] = center;

  // 经纬度每度代表的大致米数（此值基于赤道，实际应用中可能需要更精确的计算）
  const metersPerDegreeLat = 111320; // 纬度方向（更精确应考虑纬度变化）
  const metersPerDegreeLng =
    metersPerDegreeLat * Math.cos((lat * Math.PI) / 180); // 经度方向，考虑纬度影响

  // 计算每个边的经纬度差值
  const deltaLat = sideLength / metersPerDegreeLat;
  const deltaLng = sideLength / metersPerDegreeLng;

  // 计算四个角的坐标
  const topLeft = { lat: lat + deltaLat, lng: lng - deltaLng };
  // const topRight = { lat: lat + deltaLat, lng: lng + deltaLng };
  // const bottomLeft = { lat: lat - deltaLat, lng: lng - deltaLng };
  const bottomRight = { lat: lat - deltaLat, lng: lng - deltaLng };

  return [topLeft, bottomRight];
};

const MapContainer: React.FC<any> = ({ data }) => {
  const [map, setMap] = useState<any>(null);
  const [heatmap, setHeatmap] = useState<any>(null);

  useEffect(() => {
    const initMap = async () => {
      (AMapLoader as any).reset();

      const AMap = await AMapLoader.load({
        key: "0a152c6c0cf9e57afb0c0efc6dea177c",
        version: "2.0",
        plugins: ["AMap.HeatMap"],
      });

      const map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.418261, 39.921984],
        zoom: 11,
      });

      setMap(map);

      const circle = new AMap.Circle({
        center: [116.418261, 39.921984],
        radius: 10000, //半径
        strokeOpacity: 0.2,
        strokeWeight: 6,
        fillOpacity: 0.4,
        strokeDasharray: [10, 10],
      });

      // const heatmap = new AMap.HeatMap(map, {
      //   radius: 25, //给定半径
      //   opacity: [0, 0.4],
      // });
      // setHeatmap(heatmap);

      // heatmap.setDataSet({
      //   data: data?.data || [],
      //   max: 100,
      // });

      const [lng, lat] = [116.397455, 39.909187];
      const side = 200;

      const centerPoint = new AMap.LngLat(lng, lat);
      const upLeftPoint = centerPoint.offset(-side / 2, side / 2);
      const rightBottomPoint = centerPoint.offset(side / 2, -side / 2);

      const bounds = new AMap.Bounds(
        new AMap.LngLat(upLeftPoint.lng, upLeftPoint.lat),
        new AMap.LngLat(rightBottomPoint.lng, rightBottomPoint.lat)
      );

      // 创建矩形覆盖物
      const rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor: "blue",
        strokeOpacity: 0.8,
        // strokeStyle还支持 solid
        fillColor: "blue",
        fillOpacity: 0.5,
        cursor: "pointer",
        zIndex: 50,
      });

      // 将矩形添加到地图
      map.add(rectangle);

      // map.add(circle);
    };

    initMap();

    return () => {
      map?.destroy();
    };
  }, []);

  // useEffect(() => {
  //   if (heatmap) {
  //     heatmap.setDataSet({
  //       data: data?.data || [],
  //       max: 100,
  //     });

  //     data?.data?.length === 500 && map.setCenter([116.843351, 40.377058]);
  //   }
  // }, [heatmap, map, data]);

  return <div id="container" style={{ height: "100%", width: "100%" }}></div>;
};

export default MapContainer;
