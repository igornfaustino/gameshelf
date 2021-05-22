import React, { useEffect } from 'react';

import Link from 'next/link';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

import useAuthToken from '../../auth/hooks/useAuthToken';
import { useTranslation } from '../../shared/config/i18next';
import Button from '../../shared/elements/Button';
import Margin from '../../shared/elements/Margin';
import PacManSpinner from '../../shared/elements/PacManSpinner';
import Text from '../../shared/elements/Text';
import When from '../../shared/elements/When';
import { GAME_STATUS } from '../../shared/helpers/status';
import useAddGameStatus from '../hooks/useAddGameStatus';
import Bookshelf from '../icons/Bookshelf';
import GameController from '../icons/GameController';
import Trophy from '../icons/Trophy';
import Web from '../icons/Web';

const StyledModal = Modal.styled`
  padding: 16px;
  background-color: ${(props) => props.theme.colors.contentArea};
  width: 700px;
  height: 300px;
  border-radius: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.primary};
  white-space: nowrap;
  height: 10%;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

const StatusButton = styled.div<{ disabled?: boolean }>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin: 16px;
  border: ${({ disabled, ...props }) =>
      disabled ? props.theme.colors.disabled : props.theme.colors.primary}
    1px solid;
  height: 150px;
  width: 150px;
  border-radius: 10px;
  transform: ${(props) => props.disabled && 'scale(0.8)'};
  color: ${(props) => props.disabled && props.theme.colors.disabled};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0;
    text-align: center;
  }

  :hover {
    transform: ${(props) => !props.disabled && 'scale(1.1)'};
    color: ${(props) => !props.disabled && props.theme.colors.primary};
  }
`;

const LoginButton = styled.div`
  width: 100%;
`;

type Props = {
  visible: boolean;
  setVisible(boolean): void;
  gameId: string;
  name: string;
  status: string;
};

const AddGameToListModal = (props: Props) => {
  const { visible, setVisible, gameId, name, status } = props;
  const { t } = useTranslation('common');
  const { authToken } = useAuthToken();

  const { handleAddGameStatus, result, loading } = useAddGameStatus(gameId);

  const handleClose = () => {
    if (loading) return;
    setVisible(false);
  };

  useEffect(() => {
    if (!result) return;
    setVisible(false);
  }, [result, setVisible]);

  return (
    <StyledModal isOpen={visible} onBackgroundClick={handleClose} onEscapeKeydown={handleClose}>
      <ModalTitle>{name}</ModalTitle>
      <ModalBody>
        <When expr={!loading}>
          <When expr={authToken}>
            <StatusButton
              onClick={handleAddGameStatus(GAME_STATUS.toPlay)}
              disabled={status === 'to play'}
            >
              <Bookshelf size="90px" />
              <p>{t('common:to play')}</p>
            </StatusButton>
            <StatusButton
              onClick={handleAddGameStatus(GAME_STATUS.playing)}
              disabled={status === 'playing'}
            >
              <GameController size="90px" />
              <p>{t('common:playing')}</p>
            </StatusButton>
            <StatusButton
              onClick={handleAddGameStatus(GAME_STATUS.completed)}
              disabled={status === 'completed'}
            >
              <Trophy size="90px" />
              <p>{t('common:completed')}</p>
            </StatusButton>
            <StatusButton
              onClick={handleAddGameStatus(GAME_STATUS.abandoned)}
              disabled={status === 'abandoned'}
            >
              <Web size="90px" />
              <p>{t('common:abandoned')}</p>
            </StatusButton>
          </When>
          <When expr={!authToken}>
            <LoginButton>
              <Text>{t('common:needs to be logged in')}</Text>
              <Margin value={32} />
              <Link href="/login">
                <Button type="submit" block textVariant="light">
                  {t('common:login')}
                </Button>
              </Link>
              <Text center small>
                {t('common:or')}
              </Text>
              <Link href="/singup">
                <Button type="button" block white bordered>
                  {t('common:not registered')}
                </Button>
              </Link>
            </LoginButton>
          </When>
        </When>
        <When expr={loading}>
          <PacManSpinner size="8rem" />
        </When>
      </ModalBody>
    </StyledModal>
  );
};

export default AddGameToListModal;
