import styled from 'styled-components';

export const Clickable = styled.button`
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: all 0.3s;

  &:focus {
    outline: none;
  }

  &:active {
    opacity: 50%;
  }
`;

export default Clickable;
