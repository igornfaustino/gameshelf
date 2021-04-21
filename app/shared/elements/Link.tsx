import styled from 'styled-components';

export const Link = styled.a`
  color: ${(props) => props.theme.colors.link};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
