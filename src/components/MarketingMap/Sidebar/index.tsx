import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './index.module.less';

type ItemsType = { label: string; key: string; children: React.ReactNode };

type Props = {
  items: ItemsType[];
};

const Tab = ({ text }: { text: string }): React.ReactNode => (
  <span style={{ padding: '0 16px', fontSize: 18, margin: 0 }}>{text}</span>
);

const SidebarConten: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        className={styles.anchor}
        style={{ transform: `translateX(${open ? 0 : 460}px)` }}
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setOpen(prev => !prev)}
      />
      <div className={styles.sidebar} style={{ width: `${open ? 460 : 0}px` }}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<Props> = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        className={styles.anchor}
        style={{ transform: `translateX(${open ? 0 : 460}px)` }}
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setOpen(prev => !prev)}
      />
      <div className={styles.sidebar} style={{ width: `${open ? 460 : 0}px` }}>
        <div className={styles.content}>
          <Tabs
            defaultActiveKey={items[0].key}
            tabBarGutter={0}
            tabBarStyle={{
              fontWeight: 600,
              color: '#aaa',
              margin: 0,
            }}
          >
            {items.map(item => (
              <React.Fragment key={item.key}>
                <Tabs.TabPane
                  style={{ height: 'calc(100vh - 188px)', overflow: 'auto' }}
                  tab={<Tab text={item.label} />}
                  key={item.key}
                >
                  {item.children}
                </Tabs.TabPane>
              </React.Fragment>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export { SidebarConten };

export default Sidebar;
