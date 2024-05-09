import { useEffect, useState } from "react";
import { DatePicker, Row, Col } from "antd";
import moment from "moment";
import CheckTag from "../../../../components/CheckTag";

type MomentArray = [moment.Moment, moment.Moment];

type ChangeFunction = {
  (type: "dateRange", value: MomentArray): void;
  (type: "day", value: string): void;
};

const { RangePicker } = DatePicker;

const initializeDateRange = (months = 1): MomentArray => [
  moment().subtract(months, "months"),
  moment(),
];

const calculateDaysBetweenDates = (
  startDate: moment.Moment,
  endDate: moment.Moment
): string => endDate.diff(startDate, "days").toString();

const DATE_OPTIONS = [
  {
    label: "近1月",
    value: calculateDaysBetweenDates(...initializeDateRange()),
  },
  {
    label: "近3月",
    value: calculateDaysBetweenDates(...initializeDateRange(3)),
  },
  {
    label: "近6月",
    value: calculateDaysBetweenDates(...initializeDateRange(6)),
  },
  {
    label: "近12月",
    value: calculateDaysBetweenDates(...initializeDateRange(12)),
  },
];

const DateFrom: React.FC<{ onChange?: (value: MomentArray) => void }> = ({
  onChange,
}) => {
  const [dateRange, setDateRange] = useState<MomentArray>(
    initializeDateRange()
  );

  const handleChange: ChangeFunction = (type: any, value: any) => {
    let _dateRange: MomentArray;

    if (type === "dateRange") {
      _dateRange = value as MomentArray;
    } else {
      _dateRange = [
        moment().subtract(value, "days"),
        moment().subtract(0, "days"),
      ];
    }
    setDateRange(_dateRange);
  };

  useEffect(()=>{
    onChange && onChange(dateRange);
  }, [dateRange])

  return (
    <Row gutter={8} align="middle">
      <Col>
        <RangePicker
          separator="至"
          format="YYYY-MM-DD"
          size="small"
          style={{ width: 220 }}
          value={dateRange}
          onChange={(dates) => handleChange("dateRange", dates as MomentArray)}
        />
      </Col>
      <Col>
        <CheckTag
          value={
            dateRange[1].isSame(moment(), "day")
              ? calculateDaysBetweenDates(...dateRange)
              : "0"
          }
          onChange={(value) => handleChange("day", value)}
          options={DATE_OPTIONS}
        />
      </Col>
    </Row>
  );
};

export default DateFrom;
