import styled from 'styled-components';

type Props = {
  y?: string;
  x?: string;
  paddingTop?: string;
  marginTop?: string;
};

const Skeleton = styled.div<Props>`
  height: ${(props) => props.y || '100%'};
  width: ${(props) => props.x || '100%'};

  position: relative;
  overflow: hidden;
  background-color: #e2e2e2;

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(transparent),
      color-stop(rgba(255, 255, 255, 0.2)),
      to(transparent)
    );

    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);

    animation: loading 1s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default Skeleton;
