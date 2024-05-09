import { useEffect, useState } from "react";
import { Space } from "antd";
import "./index.less";

type Option = string | { label: string; value: string };

interface TagProps {
  option: Option;
  active?: boolean;
  onClick?: () => void;
}

interface CheckTagProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const SelectOptionTag = ({ option, active = false, ...props }: TagProps) => {
  const renderOption = () => {
    if (typeof option === "object") {
      return { __html: option.label };
    }
    return { __html: option };
  };

  return (
    <span className={`tag ${active ? "active" : ""}`} {...props}>
      <span dangerouslySetInnerHTML={renderOption()} />
    </span>
  );
};

const CheckTag = ({
  defaultValue = "", // 添加默认值以明确期望类型
  value: externalValue, // 使用不同的变量名以避免与参数名冲突
  options, // 明确定义默认为空数组且类型为Option[]
  onChange,
  name,
}: CheckTagProps) => {
  const [checkValue, setCheckValue] = useState<string | undefined>(defaultValue);

  const handleChange = (value: string) => {
    setCheckValue(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (externalValue !== undefined) {
      setCheckValue(externalValue);
    }
  }, [externalValue]);

  return (
    <>
      <Space size={8}>
        {options.map((item) => (
          <SelectOptionTag
            active={
              (typeof item === "object" ? item.value : item) === checkValue
            }
            option={item}
            onClick={() =>
              handleChange(typeof item === "object" ? item.value : item)
            }
            key={typeof item === "object" ? item.value : item}
          />
        ))}
      </Space>
      {name && <input type="hidden" name="checkTag" value={checkValue} />}
    </>
  );
};

export default CheckTag;
