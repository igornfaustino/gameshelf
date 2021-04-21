import React from 'react';

import { useTranslation } from '../config/i18next';
import BasicInput from './BasicInput';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { name: string; ref: React.ForwardedRef<unknown>; error?: string };

const Input = React.forwardRef(({ error, ...props }: Props, ref) => {
  const { t } = useTranslation('forms');

  let SelectedInput;

  switch (props.type) {
    default:
      SelectedInput = BasicInput;
      break;
  }

  if (!error) return <SelectedInput ref={ref} {...props} />;

  const [errorKey, optionsStr] = error.split('#');

  if (!optionsStr) return <SelectedInput ref={ref} {...props} error={t(`error.${errorKey}`)} />;

  const options = JSON.parse(optionsStr);
  return <SelectedInput ref={ref} {...props} error={t(`error.${errorKey}`, options)} />;
});

export default Input;
