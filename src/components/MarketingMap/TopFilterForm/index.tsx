import React, { useEffect, useMemo, useState } from 'react';
import { Button, Select, Space } from 'antd';
import { transformData, flattenToCodeNameMap } from '@/utils/marketingMap/utils';
// import data from './data.json';

const FilterForm: React.FC<any> = ({ data,  initialValue, onSubmit }) => {
  const [query, setQuery] = useState({
    region: '',
    subregion: '',
    city: '',
    store: '',
    areaRange: '',
    brand: '',
  });

  const options = useMemo(() => transformData(data, 'region'), [data]);

  const codeNameMap = useMemo(() => flattenToCodeNameMap(data), [data]);

  const getCodeValues = (value: string, num: number = 0) => {
    const result = [options[value][0].code];
    for (let i = 0; i < num; i++) {
      result.push(options[result[i]][0].code);
    }

    return result;
  };

  const updateQuery = {
    region: (value: string) => {
      const [subregion, city, store] = getCodeValues(value, 2);

      setQuery({ ...query, region: value, subregion, city, store });
    },
    subregion: (value: string) => {
      const [city, store] = getCodeValues(value, 1);

      setQuery({ ...query, subregion: value, city, store });
    },
    city: (value: string) => {
      const [store] = getCodeValues(value);

      setQuery({ ...query, city: value, store });
    },
    default: (key: string, value: string | number) => {
      setQuery({ ...query, [key]: value });
    },
  };
  
  const handleSubmit = () => {
    onSubmit(query, {
      region: codeNameMap[query.region],
      subregion: codeNameMap[query.subregion],
      city: codeNameMap[query.city],
      store: codeNameMap[query.store],
    });
  };

  useEffect(() => {
    const _query = { ...initialValue };

    setQuery(_query);

    onSubmit(_query, {
      region: codeNameMap[_query.region],
      subregion: codeNameMap[_query.subregion],
      city: codeNameMap[_query.city],
      store: codeNameMap[_query.store],
    });
  }, [initialValue, data]);

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <Select
        placeholder="大区"
        style={{ width: 92 }}
        value={query.region}
        onChange={value => updateQuery['region'](value)}
      >
        {options['region']?.map((item: { code: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="小区"
        style={{ width: 92 }}
        value={query.subregion}
        onChange={value => updateQuery['subregion'](value)}
      >
        {options[query.region]?.map((item: { code: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="城市"
        style={{ width: 92 }}
        value={query.city}
        onChange={value => updateQuery['city'](value)}
      >
        {options[query.subregion]?.map((item: { code: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="专营店"
        style={{ width: 108 }}
        value={query.store}
        onChange={value => updateQuery['default']('store', value)}
      >
        {options[query.city]?.map((item: { code: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <Select.Option value={item.code} key={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="区域范围"
        style={{ width: 136 }}
        value={query.areaRange}
        onChange={value => updateQuery['default']('areaRange', value)}
      >
        <Select.Option value={10}>区域范围 10km</Select.Option>
        <Select.Option value={20}>区域范围 20km</Select.Option>
      </Select>
      <Select placeholder="品牌" value={query.brand} style={{ width: 92 }}>
        <Select.Option value="fengshen">风神</Select.Option>
      </Select>

      <Space size={12}>
        <Button type="primary" onClick={handleSubmit}>
          查询
        </Button>
        <Button onClick={() => setQuery({ ...initialValue })}>重置</Button>
      </Space>
    </div>
  );
};

export default FilterForm
