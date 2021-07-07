import styled from 'styled-components';

interface Props {
  y?: number;
}

const Space = styled.div<Props>`
  margin-top: ${(props) => props.y || 20}px;
`;

export default Space;
