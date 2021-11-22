import React, { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useTranslation } from '../../shared/config/i18next';
import Button from '../../shared/elements/Button';
import SelectInput from '../../shared/elements/SelectInput';
import Skeleton from '../../shared/elements/Skeleton';
import defaultTheme from '../../shared/styles/theme';
import useGenres from '../hooks/useGenres';
import usePlatforms from '../hooks/usePlatforms';

const FilterGroup = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  height: ${(props) => props.theme.constants.inputHeight};
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
  onSubmit(submitCallback): void;
  query: string | string[];
};

const GameFilters = (props: Props) => {
  const { onSubmit, query } = props;
  const { t } = useTranslation(['button', 'forms']);
  const { platforms, loading: platformLoading } = usePlatforms();
  const { genres, loading: genreLoading } = useGenres();
  const { control, handleSubmit, reset } = useForm();

  const loading = platformLoading || genreLoading;

  const platformOptions = platforms.map((platform) => ({
    value: platform.id,
    label: platform.name,
  }));

  const genreOptions = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

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
        {loading ? (
          <Skeleton height={defaultTheme.constants.inputHeight} />
        ) : (
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
        )}
      </SelectWrapper>
      <SelectWrapper>
        {loading ? (
          <Skeleton height={defaultTheme.constants.inputHeight} />
        ) : (
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
        )}
      </SelectWrapper>
      <ButtonWrapper>
        {loading ? (
          <Skeleton height={defaultTheme.constants.inputHeight} />
        ) : (
          <Button primary textVariant="light" block>
            {t('button:filter')}
          </Button>
        )}
      </ButtonWrapper>
    </FilterGroup>
  );
};

export default GameFilters;
