import React, { useState } from 'react';

import styled from 'styled-components';

import Skeleton from './Skeleton';

const GameImage = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
  height: auto;
  width: 100%;
  max-height: 100%;
  transform: translateY(-50%);
`;

const Thumb = styled.img`
  position: absolute;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
  height: auto;
  width: 100%;
  max-height: 100%;
  transform: translateY(-50%);
  filter: blur(2px);
  transition: opacity ease-in 1000ms;
  clippath: inset(0);
`;

const ImageWrapper = styled.span`
  position: relative;
  width: 100%;
  padding-top: 135%;
`;

const StyledSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0%;
  left: 0;
  bottom: 0;
  right: 0;
  height: auto;
  width: 100%;
  height: 100%;
`;

type Props = {
  src: string;
  thumb: string;
};

const SafeGameImage = (props: Props) => {
  const { src, thumb } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  return (
    <ImageWrapper>
      <GameImage
        onLoad={() => {
          setImageLoaded(true);
        }}
        src={src}
      />
      {!imageLoaded && (
        <Thumb
          onLoad={() => {
            setThumbLoaded(true);
          }}
          src={thumb}
        />
      )}
      {!thumbLoaded && !imageLoaded && <StyledSkeleton />}
    </ImageWrapper>
  );
};

export default SafeGameImage;
