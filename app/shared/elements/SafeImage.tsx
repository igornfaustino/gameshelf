import React, { useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import Skeleton from './Skeleton';
import When from './When';

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
  ssr?: boolean;
};

const SafeGameImage = (props: Props) => {
  const { src, thumb, ssr } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);

  if (!src) return <ImageWrapper />;
  if (ssr)
    return (
      <ImageWrapper>
        <GameImage
          onLoad={() => {
            setImageLoaded(true);
          }}
          src={src}
        />
      </ImageWrapper>
    );

  return (
    <ImageWrapper>
      <GameImage
        onLoad={() => {
          setImageLoaded(true);
        }}
        src={src}
      />
      <When expr={!imageLoaded}>
        <Thumb
          onLoad={() => {
            setThumbLoaded(true);
          }}
          src={thumb}
        />
      </When>
      <When expr={!thumbLoaded && !imageLoaded}>
        <StyledSkeleton />
      </When>
    </ImageWrapper>
  );
};

export default SafeGameImage;
