import moment from 'moment';

type Moment = moment.Moment;

const calculateDaysBetweenDates = (startDate: Moment): string =>
  moment().diff(startDate, 'days').toString();

const TIME_MEP:any = {
  '1': '近1月',
  '3': '近3月',
  '6': '近6月',
  '12': '近一年',
};
// 
const DATE_OPTIONS = Object.keys(TIME_MEP).map(key => {
  return {
    label: TIME_MEP[key],
    value: key,
  };
});

export { calculateDaysBetweenDates, TIME_MEP, DATE_OPTIONS };

export default { calculateDaysBetweenDates };
