import { Card } from 'antd';
import withCustomClass from '@/utils/marketingMap/withCustomClass';
import styles from './index.module.less';

const CustomCard = withCustomClass(Card, styles.box_shadow, {
  headStyle: {
    background: '#fafafa',
    textAlign: 'center',
  },
  size: 'small',
});

export default CustomCard;
