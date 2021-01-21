import React from 'react';

import Select, { OptionsType } from 'react-select';

import defaultTheme from '../../styles/theme';

type Props = {
  options: { value: string; label: string }[];
  isMulti?: boolean;
  placeholder?: string;
  onChange(): void;
  value: { value: string; label: string } | OptionsType<{ value: string; label: string }>;
};

const SelectInput = (props: Props) => {
  const { options, isMulti, placeholder, onChange, value } = props;
  return (
    <>
      <Select
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary: defaultTheme.colors.primary,
          },
        })}
      />
    </>
  );
};

export default SelectInput;
