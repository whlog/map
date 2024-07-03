import { useCallback, useState } from "react";
import { useSetState, useUpdateEffect } from "ahooks";
import { bounds } from "@/utils/marketingMap/utils";
import exclusive from "../../assets/map/exclusive.png";

interface StoreProps {
  longitude: string;
  latitude: string;
  name: string;
  vehicleCount: number;
  aftersalesCount: number;
  recentYearCustomerCount: number;
}

const icon: any = {
  type: "image",
  image: exclusive,
  size: [45, 45],
  anchor: "center",
};

const getColorBasedOnValue = (type: number) =>
  ["#076ad1", "#5f3a7b", "#c6032a"][type];

const content = (data: Omit<StoreProps, "longitude" | "latitude">) => `
  <div class="infoWindow>
    <div style="font-weight: 600; margin-bottom: 12px;">${data.name}</div>
    <div>售后车辆 ${data.vehicleCount}台</div>
    <div>售后车次 ${data.aftersalesCount}次</div>
    <div>近一年有效保客数${data.recentYearCustomerCount}台</div>
  <div/>
`;
const useMap = (data: any) => {
  const [status, setStatus] = useState(true);
  const [state, setState] = useSetState<any>({});
  const { map, AMap, circle, layer, heatMap, infoWindow, overlayGroup } = state;

  const onRenderingCompleted = (map: any, AMap: any) => {
    const circle = new AMap.Circle({
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillOpacity: 0.3,
    });

    const layer = new AMap.LabelsLayer({
      zooms: [3, 20],
      zIndex: 1000,
    });

    const heatMap = new AMap.HeatMap(map, {
      radius: 25,
      opacity: [0, 0.4],
    });

    const infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -30),
      closeWhenClickMap: true,
    });

    const overlayGroup = new AMap.OverlayGroup();

    map.add(circle, infoWindow, overlayGroup);

    setState({ map, AMap, circle, layer, heatMap, infoWindow, overlayGroup });
  };

  const zoomMin = useCallback((heatmaps: Pick<StoreProps, "longitude" | "latitude" | "vehicleCount">[], stores: any[]) => {
    const myStore = stores[0];

    overlayGroup.hide();

    circle.setCenter([myStore.longitude, myStore.latitude]);
    circle.setRadius(10000);

    const markerClick = (content: string, position: any) => {
      infoWindow.setContent(content);
      infoWindow.open(map, position);
    };

    const labelMarkers = stores.map((item: StoreProps) => {
      const labelMarker = new AMap.LabelMarker({
        position: [+item.longitude, +item.latitude],
        icon,
      });

      labelMarker.on("mouseover", (e: any) =>
        markerClick(content(item), e.target.getPosition())
      );

      return labelMarker;
    });

    layer.add(labelMarkers);

    const heatMapData = heatmaps.map(
      (item: Pick<StoreProps, "longitude" | "latitude" | "vehicleCount">) => ({
        lng: item.longitude,
        lat: item.latitude,
        count: item.vehicleCount,
      })
    );

    heatMap.setDataSet({
      data: heatMapData,
      max: 100,
    });

    map.add(layer);
    circle.show();
    layer.show();
    heatMap.show();
  }, [circle]);

  const zoomMax = useCallback((gridmap: { geohash: string; type: number; count: number; }[]) => {
    overlayGroup.clearOverlays();
    const markers: any[] = gridmap.map(
      (item: { geohash: string; type: number; count: number }) => {
        const { sw, ne } = bounds(item.geohash);
        const color = getColorBasedOnValue(item.type);

        return new AMap.Rectangle({
          fillColor: color,
          strokeColor: color,
          fillOpacity: item.count / 100,
          bounds: new AMap.Bounds(
            new AMap.LngLat(sw.lng, sw.lat),
            new AMap.LngLat(ne.lng, ne.lat)
          ),
        });
      }
    );
    overlayGroup.addOverlays(markers);

    map.add(overlayGroup);

    circle.hide();
    layer.hide();
    heatMap.hide();

    setState({ overlayGroup });
  }, [circle]);

  useUpdateEffect(() => {
    if (Object.keys(state).length && data) {
      const [heatmaps, stores, gridmap] = data;
      const myStore = stores[0];
      map.setCenter([myStore.longitude, myStore.latitude]);

      if (map.getZoom() < 14) {
        zoomMin(heatmaps, stores);
      } else {
        zoomMax(gridmap);
      }
    }
  }, [data, circle]);

  useUpdateEffect(() => {
    if (map) {
      map.on("zoomend", () => {
        if (map.getZoom() < 14) {
          setStatus(true);
        }

        if (map.getZoom() >= 14) {
          setStatus(false);
        }
      });
    }
  }, [map]);

  useUpdateEffect(() => {
    if (status) {
      zoomMin(data[0], data[1]);
    } else {
      zoomMax(data[2]);
    }
  }, [status])

  return { status, onRenderingCompleted };
};

export default useMap;
