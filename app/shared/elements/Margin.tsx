import styled from 'styled-components';

type Props = {
  value: number;
};

const Margin = styled.div`
  margin-bottom: ${({ value = 16 }: Props) => `${value}px`};
`;

export default Margin;
