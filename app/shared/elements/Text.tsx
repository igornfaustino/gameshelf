import styled from 'styled-components';

export const Text = styled.p`
  color: ${(props) => props.theme.colors.fontBlack};
  text-align: ${(props) => (props.center ? 'center' : 'justify')};
  font-size: ${(props) => (props.small ? '0.9rem' : '1rem')};
  margin: 8px;
`;

export default Text;
