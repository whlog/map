import React, { ComponentType } from 'react';

type HigherOrderComponent = <P extends object>(
  WrappedComponent: ComponentType<P>,
  customClassName: string,
  other?: { [key: string]: any },
) => ComponentType<P>;

/**
 * 生成一个高阶组件（HOC），为被包装组件添加自定义的CSS类名。
 * @param WrappedComponent 被包装的组件。
 * @param customClassName 需要添加的自定义CSS类名。
 * @param other 可选的额外属性对象，这些属性将被传递给被包装的组件。
 * @returns 返回一个增强的组件，该组件在原有属性基础上增加了自定义类名。
 */

const withCustomClass: HigherOrderComponent = (WrappedComponent, customClassName, other = {}) => {
  const EnhancedComponent = (props: any) => {
    return (
      <WrappedComponent {...other} {...props} className={`${props.className} ${customClassName}`} />
    );
  };

  return EnhancedComponent;
};

export default withCustomClass;
