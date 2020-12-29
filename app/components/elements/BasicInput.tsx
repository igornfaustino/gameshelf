import React from 'react';
import styled from 'styled-components';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { error?: string };

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-color: ${(props) => props.error && props.theme.colors.error};
  border-radius: 2px;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    border-right-width: 1px !important;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px ${(props) => props.theme.colors.inputShadow};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.inputShadow};
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.875rem;
  text-transform: capitalize;
`;

const InputGroup = styled.div`
  height: 50px;
  margin-bottom: 8px;
`;

const BasicInput = (props: Props) => {
  const { error } = props;

  return (
    <InputGroup>
      <StyledInput {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputGroup>
  );
};

export default BasicInput;
