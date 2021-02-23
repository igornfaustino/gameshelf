import React, { Fragment } from 'react';

type Props = {
  expr: boolean | (() => boolean);
  children: React.ReactChild | React.ReactChildren | React.ReactNode;
};

export default function When(props: Props) {
  const { expr, children } = props;

  if (typeof expr === 'boolean' && !expr) return <></>;
  if (typeof expr === 'function' && !expr()) return <></>;

  return <>{children}</>;
}
