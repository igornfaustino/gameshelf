import styled from 'styled-components';

import { ThemeType } from '../../styles/theme';

type Props = {
  textVariant: string;
  primary?: boolean;
  white?: boolean;
  theme: ThemeType;
};

const selectBgColor = (props: Props) => {
  if (props.primary) return props.theme.colors.primary;
  if (props.white) return '#fff';
  return props.theme.colors.primary;
};

const selectTextColor = (props: Props) => {
  const { textVariant } = props;
  switch (textVariant) {
    case 'light':
      return props.theme.colors.fontWhiter;
    case 'primary':
      return props.theme.colors.primary;
    default:
      return props.theme.colors.fontBlacker;
  }
};

const Button = styled.button`
  border: none;
  padding: 8px;
  cursor: pointer;
  width: ${(props) => props.block && '100%'};
  background-color: ${(props) => selectBgColor(props)};
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: all 0.3s;
  color: ${(props) => selectTextColor(props)};
  font-weight: 600;
  border: ${(props) => props.white && `${selectTextColor(props)} 1px solid`};

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(80%);
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
