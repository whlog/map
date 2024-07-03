import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

const MapContainer = forwardRef<any, any>(
  (
    {
      onRenderingCompleted,
      options = {
        center: [114.295643, 30.561742],
        zoom: 11,
        showIndoorMap: false,
      },
      plugins = [],
    },
    ref
  ) => {
    const mapRef = useRef<any>(null);
    const [{ map, AMap }, setMap] = useState<any>({
      map: null,
      AMap: null,
    });

    useEffect(() => {
      const initMap = async () => {
        (AMapLoader as any).reset();

        const AMap = await AMapLoader.load({
          key: "0a152c6c0cf9e57afb0c0efc6dea177c",
          version: "2.0",
          plugins,
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "2.0.0",
          },
        });

        const map = new AMap.Map(mapRef.current, options);

        map.on("complete", () => {
          onRenderingCompleted && onRenderingCompleted(map, AMap);
        });

        setMap({ map, AMap });
      };

      initMap();

      return () => map?.destroy();
    }, []);

    useImperativeHandle(ref, () => ({
      map,
      AMap,
    }));

    return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
  }
);

export default MapContainer;
