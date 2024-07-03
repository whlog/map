import React, { ReactNode } from 'react';
import { Spin } from 'antd';

type Props = {
  isFirstLoad?:boolean;
  loading?: boolean;
  children?: ReactNode;
};

const Loadable: React.FC<Props> = ({ isFirstLoad, loading, children = null }) => {

  if (isFirstLoad) {
    return (
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgb(255,255,255)',
        }}
      >
        <Spin />
      </div>
    );
  }

  if (loading) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}
        >
          <Spin />
        </div>

        {children}
      </>
    );
  }

  return children;
};

export default Loadable;
