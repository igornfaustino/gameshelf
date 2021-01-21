import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import styled from 'styled-components';

import { useTranslation } from '../../config/i18next';
import { contextMenu, OFFLINE_ROUTE_KEY, ONLINE_ROUTE_KEY } from '../../config/routes';
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
  const [context, setContext] = useState('');
  const { t } = useTranslation('menu');

  useEffect(() => {
    const token = window.localStorage.getItem('auth');
    if (!token) return setContext(OFFLINE_ROUTE_KEY);
    return setContext(ONLINE_ROUTE_KEY);
  }, []);

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
      </div>
    </Horizontal>
  );
};

export default ContextMenu;
