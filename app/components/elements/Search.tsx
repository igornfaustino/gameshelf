import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { StyledInput } from './BasicInput';
import SearchIcon from '../../assets/icons/search.svg';
import { useTranslation } from '../../config/i18next';

const SearchInput = styled(StyledInput)`
  border-radius: 2px 0px 0px 2px;
  color: ${(props) => props.theme.colors.fontBlack};
`;

const SearchForm = styled.form`
  display: flex;
  height: 100%;
  width: 400px;
`;

const SearchButton = styled.button`
  border: 1px solid #d9d9d9;
  border-color: ${(props) => props.error && props.theme.colors.error};
  border-radius: 0px 2px 2px 0px;
  height: ${(props) => props.theme.constants.inputHeight};
  width: ${(props) => props.theme.constants.inputHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.fontBlack};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 50%;
  }
`;

const Search = () => {
  const { t } = useTranslation('forms');
  const { register, handleSubmit } = useForm();
  return (
    <SearchForm onSubmit={handleSubmit((data) => console.log(data))}>
      <SearchInput name="search" ref={register} placeholder={t('forms:placeholder.search')} />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </SearchForm>
  );
};

export default Search;
