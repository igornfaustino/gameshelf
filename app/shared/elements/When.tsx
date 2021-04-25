import React from 'react';

export default function When(props) {
  const { expr, children } = props;

  if (expr) return typeof children === 'function' ? children() : children;
  return <></>;
}
