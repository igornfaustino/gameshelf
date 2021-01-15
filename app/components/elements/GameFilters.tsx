import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { number } from 'yup';

import SelectInput from './SelectInput.';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const FilterGroup = styled.form`
  display: flex;
`;

const SelectWrapper = styled.div`
  width: 100%;
  padding: 8px;
`;

export type FilterSubmitCallback = {
  platforms: number[];
};

type Props = {
  platformOptions: { value: string; label: string }[];
  onSubmit(submitCallback): void;
};

const GameFilters = (props: Props) => {
  const { platformOptions, onSubmit } = props;
  const { control, handleSubmit } = useForm();

  const handleFormSubmit = ({ platform }) => {
    const platformIds = platform?.map(({ value }) => parseInt(value, 10));
    onSubmit({ platforms: platformIds });
  };

  return (
    <FilterGroup onSubmit={handleSubmit(handleFormSubmit)}>
      <SelectWrapper>
        <Controller
          control={control}
          name="platform"
          render={({ onChange, value }) => (
            <SelectInput options={platformOptions} isMulti onChange={onChange} value={value} />
          )}
        />
      </SelectWrapper>
      <SelectWrapper>{/* <SelectInput options={options} isMulti /> */}</SelectWrapper>
    </FilterGroup>
  );
};

export default GameFilters;
