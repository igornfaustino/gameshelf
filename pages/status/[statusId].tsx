import { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Game from '../../app/game/components/Game';
import GamesArea from '../../app/game/components/GamesArea';
import { GET_GAME_BY_STATUS } from '../../app/game/graphql/games';
import Bookshelf from '../../app/game/icons/Bookshelf';
import GameController from '../../app/game/icons/GameController';
import Trophy from '../../app/game/icons/Trophy';
import Web from '../../app/game/icons/Web';
import { GameType } from '../../app/game/types/game';
import { useTranslation } from '../../app/shared/config/i18next';
import { SITUATIONS } from '../../app/shared/helpers/status';
import DashboardLayout from '../../app/shared/templates/DashboardLayout';

const SideBarLayout = styled.div`
  display: flex;
  height: 100%;
`;

const SideBar = styled.div`
  min-width: 200px;
  width: 200px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.separator};
`;

const Option = styled.div<{ active?: boolean }>`
  width: 200px;
  background-color: ${(props) => (props.active ? props.theme.colors.primary : 'transparent')};
  padding: 8px;
  color: ${(props) =>
    props.active ? props.theme.colors.fontWhiter : props.theme.colors.fontBlacker};
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.fontWhiter};
  }

  p {
    margin: 0;
    margin-left: 8px;
  }
`;

const MainArea = styled.div`
  width: 100%;
`;

const Fixed = styled.div`
  position: fixed;
`;

type GameByStatusType = {
  gamesByStatus:
    | {
        games: GameType[];
        count: number;
        __typename: 'GamesByStatus';
      }
    | {
        __typename: 'Unauthorized';
      };
};

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const pageStatusId = router.query.statusId as string;

  const { loading, data } = useQuery<GameByStatusType>(GET_GAME_BY_STATUS, {
    variables: {
      statusId: SITUATIONS[pageStatusId],
    },
    skip: !(pageStatusId in SITUATIONS),
    fetchPolicy: 'cache-and-network',
    ssr: false,
  });

  const handleClick = (status) => () => {
    router.push(`/status/${status}`);
  };

  useEffect(() => {
    if (!(pageStatusId in SITUATIONS)) {
      router.push(`/status/${Object.keys(SITUATIONS)[0]}`);
    }
  }, [router, pageStatusId]);

  return (
    <DashboardLayout>
      <SideBarLayout>
        <SideBar>
          <Fixed>
            <Option active={pageStatusId === 'toPlay'} onClick={handleClick('toPlay')}>
              <Bookshelf size="20px" />
              <p>{t('common:to play')}</p>
            </Option>
            <Option active={pageStatusId === 'playing'} onClick={handleClick('playing')}>
              <GameController size="20px" />
              <p>{t('common:playing')}</p>
            </Option>
            <Option active={pageStatusId === 'completed'} onClick={handleClick('completed')}>
              <Trophy size="20px" />
              <p>{t('common:completed')}</p>
            </Option>
            <Option active={pageStatusId === 'abandoned'} onClick={handleClick('abandoned')}>
              <Web size="20px" />
              <p>{t('common:abandoned')}</p>
            </Option>
          </Fixed>
        </SideBar>
        <MainArea>
          <GamesArea loading={loading} limit={30}>
            {data?.gamesByStatus.__typename === 'GamesByStatus' &&
              data.gamesByStatus.games.map((game) => <Game key={game.id} {...game} />)}
          </GamesArea>
        </MainArea>
      </SideBarLayout>
    </DashboardLayout>
  );
}
