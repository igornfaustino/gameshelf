import styled from 'styled-components';

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardColor};
  padding: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default Card;
