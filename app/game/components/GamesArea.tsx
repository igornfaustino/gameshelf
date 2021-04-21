import styled from 'styled-components';

import Skeleton from '../../shared/elements/Skeleton';

const GamesAreaWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 262px));
  grid-gap: 32px;
  justify-items: center;
  justify-content: center;
  height: 100%;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 230px));
  }

  @media (max-width: 1479px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
  }
`;

const GamesArea = (props) => {
  const { children, loading, limit } = props;
  if (loading) {
    const gamesPlaceholder = [];
    for (let i = 0; i < limit; i++) {
      gamesPlaceholder.push(<Skeleton paddingTop="150%" key={i} />);
    }
    return <GamesAreaWrapper>{gamesPlaceholder}</GamesAreaWrapper>;
  }
  return <GamesAreaWrapper>{children}</GamesAreaWrapper>;
};

export default GamesArea;
