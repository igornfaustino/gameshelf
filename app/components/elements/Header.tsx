import styled from 'styled-components';
import Brand from './Brand';
import Clickable from './Clickable';

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.header};
  height: ${(props) => props.theme.constants.headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  transition: all 0.5s;
  padding: 0 50px 0 50px;
  top: 0;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Clickable>
        <Brand />
      </Clickable>
    </StyledHeader>
  );
};

export default Header;
