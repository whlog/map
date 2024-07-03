import { useState } from 'react';
import moment from 'moment';

type ValueProps = {
  date: moment.Moment;
  day: string;
};
const useDateFrom = ({
  defaultValue = { day: '1', date: moment() },
}: {
  defaultValue: ValueProps;
}) => {
  const [{ day, date }, setQuery] = useState(defaultValue);
  const handleQueryChange = (value: ValueProps) => {
    setQuery(value);
  };

  return {
    day,
    date,
    handleQueryChange,
  };
};

export default useDateFrom;
