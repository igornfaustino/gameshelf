import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

import { useTranslation } from '../../config/i18next';
import { ADD_GAME_STATUS } from '../../graphql/games';
import Bookshelf from '../icons/Bookshelf';
import GameController from '../icons/GameController';
import Trophy from '../icons/Trophy';
import Web from '../icons/Web';
import PacManSpinner from './PacManSpinner';
import When from './When';

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

const StatusButton = styled.div`
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

  const [addGameStatus, { data, loading }] = useMutation(ADD_GAME_STATUS, {
    onError: () => {
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleClose = () => {
    if (loading) return;
    setVisible(false);
  };

  const handleAddGame = (statusId) => () => {
    addGameStatus({
      variables: {
        gameId,
        statusId,
      },
    });
  };

  useEffect(() => {
    if (!data || !data.addStatusToGame) return;
    toast.success(t('common:success.game_added'));
    setVisible(false);
  }, [data, setVisible, t]);

  return (
    <StyledModal isOpen={visible} onBackgroundClick={handleClose} onEscapeKeydown={handleClose}>
      <ModalTitle>{name}</ModalTitle>
      <ModalBody>
        <When expr={!loading}>
          <StatusButton onClick={handleAddGame(1)} disabled={status === 'to play'}>
            <Bookshelf size="90px" />
            <p>{t('common:to play')}</p>
          </StatusButton>
          <StatusButton onClick={handleAddGame(2)} disabled={status === 'playing'}>
            <GameController size="90px" />
            <p>{t('common:playing')}</p>
          </StatusButton>
          <StatusButton onClick={handleAddGame(3)} disabled={status === 'completed'}>
            <Trophy size="90px" />
            <p>{t('common:completed')}</p>
          </StatusButton>
          <StatusButton onClick={handleAddGame(4)} disabled={status === 'abandoned'}>
            <Web size="90px" />
            <p>{t('common:abandoned')}</p>
          </StatusButton>
        </When>
        <When expr={loading}>
          <PacManSpinner size="8rem" />
        </When>
      </ModalBody>
    </StyledModal>
  );
};

export default AddGameToListModal;
