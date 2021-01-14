import styled from 'styled-components';

const GamesArea = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 262px));
  grid-gap: 16px;
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

export default GamesArea;
