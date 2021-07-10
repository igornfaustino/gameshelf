import styled from 'styled-components';

import Game from '../app/game/components/Game';
import GameCarousel from '../app/game/components/GameCarousel';
import { GET_HOME_GAMES } from '../app/game/graphql/games';
import useHomeGames from '../app/game/hooks/useHomeGames';
import { initializeApollo } from '../app/shared/config/apolloClient';
import { useTranslation } from '../app/shared/config/i18next';
import Space from '../app/shared/elements/Space';
import DashboardLayout from '../app/shared/templates/DashboardLayout';

const Banner = styled.div`
  background-color: ${(props) => props.theme.colors.header};
  color: ${(props) => props.theme.colors.fontWhiter};
  text-align: center;
  padding: 16px;
  font-size: 24px;
`;

export default function Home() {
  const { t } = useTranslation('common');
  const { popular, releases } = useHomeGames();

  return (
    <DashboardLayout>
      <p>{t('common:last releases')}</p>
      <GameCarousel cardWidth={260}>
        {releases.map((game) => (
          <Game {...game} key={game.id} ssr />
        ))}
      </GameCarousel>

      <Space y={30} />
      <Banner>{t('common:find new games and manage your life')}</Banner>
      <Space y={1} />

      <p>{t('common:popular games')}</p>
      <GameCarousel cardWidth={260}>
        {popular.map((game) => (
          <Game {...game} key={game.id} ssr />
        ))}
      </GameCarousel>
    </DashboardLayout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_HOME_GAMES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 360,
  };
}
