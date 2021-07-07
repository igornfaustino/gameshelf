import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

const Carousel = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 90vw;
`;

const Card = styled.div<{ width: number; gap: number }>`
  width: ${(props) => props.width}px;
  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: ${(props) => props.gap}px;
  }
`;

type Props = {
  children: React.ReactElement[];
  cardWidth?: number;
};

const GameCarousel = (props: Props) => {
  const { children: cards, cardWidth = 200 } = props;
  const carouselRef = useRef<HTMLDivElement>(null);

  const [firstCardIndex, setFirstCardIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState<number | undefined>(undefined);

  const cardsPerHorse = Math.max(1, Math.floor((carouselWidth ?? 0) / cardWidth));

  useEffect(() => {
    const updateCarouselWidth = () => {
      setCarouselWidth(carouselRef.current?.offsetWidth ?? 0);
    };

    const onResize = () => {
      updateCarouselWidth();
    };

    window.addEventListener('resize', onResize);
    updateCarouselWidth();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Carousel ref={carouselRef}>
      {cards.map((card) => (
        <Card width={cardWidth} gap={20} key={card.key}>
          {card}
        </Card>
      ))}
    </Carousel>
  );
};

export default GameCarousel;
