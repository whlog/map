import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { DATE_OPTIONS } from './configs';
import CheckTag from '../CheckTag';

type Moment = moment.Moment;
type ChangeFunction = {
  (type: 'date', value: Moment): void;
  (type: 'day', value: string): void;
};

type Value = {
  date: Moment;
  day: string;
};

const DateFrom: React.FC<{
  onChange?: any;
  defaultValue?: Value;
  value?: Value;
}> = ({ onChange, defaultValue, value:externalValue }) => {
  const [date, setDate] = useState(defaultValue?.date);
  const [day, setDay] = useState(defaultValue?.day);

  const handleChange: ChangeFunction = (type: any, value: any) => {
    let result = { date, day };
    if (type === 'date') {
      result['date'] = value;
      Object.assign(result, { date: value })
      setDate(value);
    } else {
      Object.assign(result, { day: value })
      setDay(value);
    }
    onChange(result);
  };

  useEffect(() => {
    if (externalValue) {
      setDate(externalValue.date);
      setDay(externalValue.day);
    }
  }, [externalValue]);

  return (
    <Row gutter={8} align="middle">
      <Col>
        <DatePicker
          allowClear={false}
          value={date}
          onChange={value => handleChange('date', value as Moment)}
          disabledDate={current => current.isBefore(moment().subtract(2, 'years').startOf('day'))}
        />
      </Col>
      <Col>
        <CheckTag
          value={day}
          onChange={value => handleChange('day', value)}
          options={DATE_OPTIONS}
        />
      </Col>
    </Row>
  );
};

export default DateFrom;
