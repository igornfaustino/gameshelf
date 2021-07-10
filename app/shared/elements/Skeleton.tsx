import styled from 'styled-components';

type Props = {
  height?: string;
  width?: string;
  paddingTop?: string;
};

const Skeleton = styled.div<Props>`
  height: ${(props) => props.height || '100%'};
  width: ${(props) => props.width || '100%'};
  padding-top: ${(props) => props.paddingTop};
  position: relative;
  background-color: #e2e2e2;

  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100px;
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

    /* Adding animation */
    animation: loading 0.8s infinite;
  }

  /* Loading Animation */
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default Skeleton;
