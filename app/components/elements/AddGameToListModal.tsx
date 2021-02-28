import React, { useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Modal from 'styled-react-modal';

import { useTranslation } from '../../config/i18next';
import { ADD_GAME_STATUS } from '../../graphql/games';
import PacManSpinner from './PacManSpinner';
import When from './When';

const StyledModal = Modal.styled`
  padding: 16px;
  background-color: ${(props) => props.theme.colors.contentArea};
  width: 500px;
  height: 250px;
  border-radius: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.primary};
  white-space: nowrap;
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  visible: boolean;
  setVisible(boolean): void;
  gameId: string;
  name: string;
};

const AddGameToListModal = (props: Props) => {
  const { visible, setVisible, gameId, name } = props;

  const { t } = useTranslation('common');

  const [addGameStatus, { data, loading }] = useMutation(ADD_GAME_STATUS, {
    onError: (error) => {
      console.log({ error });
      toast.error(t('common:errors.something_went_wrong'));
    },
  });

  const handleClose = () => {
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
          <button onClick={handleAddGame(1)} type="button">
            To play
          </button>
          <button onClick={handleAddGame(2)} type="button">
            playing
          </button>
          <button onClick={handleAddGame(3)} type="button">
            completed
          </button>
          <button onClick={handleAddGame(4)} type="button">
            abandoned
          </button>
        </When>
        <When expr={loading}>
          <PacManSpinner size="8rem" />
        </When>
      </ModalBody>
    </StyledModal>
  );
};

export default AddGameToListModal;
