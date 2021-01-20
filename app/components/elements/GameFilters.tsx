import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from '../../config/i18next';
import Button from './Button';

import SelectInput from './SelectInput.';

const FilterGroup = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  height: 38px;
  width: 60px;

  button {
    height: 100%;
  }
`;

const SelectWrapper = styled.div`
  width: 30%;
  padding: 8px;
`;

export type FilterSubmitCallback = {
  platforms?: number[];
  genres?: number[];
};

type Props = {
  platformOptions: { value: string; label: string }[];
  genreOptions: { value: string; label: string }[];
  onSubmit(submitCallback): void;
  query: string | string[];
};

const GameFilters = (props: Props) => {
  const { t } = useTranslation(['button', 'forms']);
  const { platformOptions, onSubmit, genreOptions, query } = props;
  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = ({ platform, genre }) => {
    const platformIds = platform?.map(({ value }) => parseInt(value, 10));
    const genreIds = genre?.map(({ value }) => parseInt(value, 10));
    onSubmit({
      platforms: platformIds?.length ? platformIds : undefined,
      genres: genreIds?.length ? genreIds : undefined,
    });
  };

  useEffect(() => {
    reset({
      genre: [],
      platform: [],
    });
  }, [query, reset]);

  return (
    <FilterGroup onSubmit={handleSubmit(handleFormSubmit)}>
      <SelectWrapper>
        <Controller
          control={control}
          name="platform"
          render={({ onChange, value }) => (
            <SelectInput
              options={platformOptions}
              isMulti
              onChange={onChange}
              value={value}
              placeholder={t('forms:placeholder.platform')}
            />
          )}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Controller
          control={control}
          name="genre"
          render={({ onChange, value }) => (
            <SelectInput
              options={genreOptions}
              isMulti
              onChange={onChange}
              value={value}
              placeholder={t('forms:placeholder.genre')}
            />
          )}
        />
      </SelectWrapper>
      <ButtonWrapper>
        <Button primary textVariant="light" block>
          {t('button:filter')}
        </Button>
      </ButtonWrapper>
    </FilterGroup>
  );
};

export default GameFilters;
