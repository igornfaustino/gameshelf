import styled from 'styled-components';

export const Brand = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 24px;

  &::after {
    content: 'GAMESHELF';
  }
`;

export default Brand;
