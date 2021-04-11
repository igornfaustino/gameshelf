import React, { useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useTranslation } from '../../config/i18next';
import { contextMenu, OFFLINE_ROUTE_KEY, ONLINE_ROUTE_KEY } from '../../config/routes';
import useAuthToken from '../../modules/auth/useAuthToken';
import useLogout from '../../modules/auth/useLogout';
import Clickable from './Clickable';
import Search from './Search';

const MenuItem = styled.span`
  color: ${(props) => props.theme.colors.fontWhite};
  font-size: 16px;
  transition: all 0.3s;
  margin-left: 16px;

  &:hover {
    color: ${(props) => props.theme.colors.fontWhiter};
  }
`;

const Horizontal = styled.div`
  display: flex;
  align-items: center;
`;

const ContextMenu = () => {
  const router = useRouter();
  const [context, setContext] = useState('');
  const { t } = useTranslation('menu');
  const { authToken } = useAuthToken();
  const logout = useLogout();

  const onLogout = () => {
    setContext(OFFLINE_ROUTE_KEY);
    logout().then(() => {
      router.push('/');
    });
  };

  useEffect(() => {
    if (!authToken) return setContext(OFFLINE_ROUTE_KEY);
    return setContext(ONLINE_ROUTE_KEY);
  }, [authToken]);

  if (!context) return <></>;

  return (
    <Horizontal>
      <Search />
      <div>
        {contextMenu[context].map(({ href, nameKey }) => (
          <Link href={href} passHref key={href}>
            <Clickable>
              <MenuItem>{t(nameKey)}</MenuItem>
            </Clickable>
          </Link>
        ))}
        {context === ONLINE_ROUTE_KEY && (
          <Clickable onClick={onLogout}>
            <MenuItem>{t('logout')}</MenuItem>
          </Clickable>
        )}
      </div>
    </Horizontal>
  );
};

export default ContextMenu;
