interface Node {
  code: string;
  name: string;
  children?: Node[];
}

interface FlattenedData {
  [key: string]: Node[];
}

interface InputData {
  longitude: number;
  latitude: number;
  inStoreData: { longitude: number; latitude: number }[];
}

/**
 * 将给定的节点数据转换为扁平化结构。
 * @param data 要转换的节点数组，每个节点包含代码和名称，以及可能的子节点。
 * @param name 用于作为根节点名称的字符串。
 * @returns 返回一个对象，其中键是节点代码的前缀，值是一个对象数组，每个对象包含代码和名称。
 */
export const transformData = (data: Node[], name: string): FlattenedData => {
  const result:any = {};

  const processNode = (node: Node, prefix = '') => {
    if (!result[prefix]) {
      result[prefix] = [];
    }
    result[prefix].push({ code: node.code, name: node.name });

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        processNode(child, node.code);
      });
    }
  };

  data.forEach(rootNode => {
    processNode(rootNode, name);
  });

  return result;
};

/**
 * 将节点数据扁平化为代码名称映射表
 * @param data 节点数组，每个节点包含代码(code)、名称(name)和子节点(children)属性
 * @returns 返回一个对象，键为节点代码，值为节点名称
 */
export const flattenToCodeNameMap = (data: any[]): { [key: string]: string } => {
  const result:any = {};

  const recursiveTraverse = (data: any[]) => {
    data.forEach(item => {
      const { code, name, children } = item;

      result[code] = name;
      if (children && children.length > 0) {
        recursiveTraverse(children);
      }
    });
  };

  recursiveTraverse(data);

  return result;
};

/**
 * 将给定数据转换为GeoJSON LineString格式的数组。
 * @param inputData 输入数据，包含主要位置的经纬度和一个存储位置数据的数组。
 * @param isReverse 指示是否反向处理坐标的布尔值。
 * @returns 返回一个包含GeoJSON Feature对象的数组，每个对象代表一个从主要位置到商店位置的线段。
 */
export const convertToGeoJSONLineStrings = (inputData: InputData, isReverse: boolean): any[] => {
  const { longitude: mainLong, latitude: mainLat } = inputData;
  const features: any[] = [];

  inputData.inStoreData.forEach(store => {
    const { longitude, latitude } = store;

    const coordinates: [number, number][] = [
      [mainLong, mainLat],
      [longitude, latitude],
    ];

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: isReverse ? coordinates : coordinates.reverse(),
      },
    });
  });

  return features;
};

/**
 * Returns SW/NE latitude/longitude bounds of specified geohash.
 * @param   {string} geohash - Cell that bounds are required of.
 * @returns {{sw: {lat: number, lng: number}, ne: {lat: number, lng: number}}}
 * @throws  Invalid geohash.
 */
export const bounds = (
  geohash: string,
): {
  sw: { lat: number; lng: number };
  ne: { lat: number; lng: number };
} => {
  if (geohash.length == 0) throw new Error('Invalid geohash');
  const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';

  geohash = geohash.toLowerCase();

  let evenBit = true;
  let latMin = -90,
    latMax = 90;
  let lonMin = -180,
    lonMax = 180;

  for (let i = 0; i < geohash.length; i++) {
    const chr = geohash.charAt(i);
    const idx = base32.indexOf(chr);
    if (idx == -1) throw new Error('Invalid geohash');

    for (let n = 4; n >= 0; n--) {
      const bitN = (idx >> n) & 1;
      if (evenBit) {
        // longitude
        const lonMid = (lonMin + lonMax) / 2;
        if (bitN == 1) {
          lonMin = lonMid;
        } else {
          lonMax = lonMid;
        }
      } else {
        // latitude
        const latMid = (latMin + latMax) / 2;
        if (bitN == 1) {
          latMin = latMid;
        } else {
          latMax = latMid;
        }
      }
      evenBit = !evenBit;
    }
  }

  return {
    sw: { lat: latMin, lng: lonMin },
    ne: { lat: latMax, lng: lonMax },
  };
};

export const mapper = ['免保', '保修', '召回专案', '自主到店', '首保', '定期保养'];
