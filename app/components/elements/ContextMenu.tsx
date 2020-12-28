import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../config/i18next';
import { contextMenu, OFFLINE_ROUTE_KEY } from '../../config/routes';
import Clickable from './Clickable';

const MenuItem = styled.span`
  color: ${(props) => props.theme.colors.fontWhite};
  font-size: 16px;
  transition: all 0.3s;
  margin-left: 16px;

  &:hover {
    color: ${(props) => props.theme.colors.fontWhiter};
  }
`;

const ContextMenu = () => {
  const [context, setContext] = useState('');
  const { t } = useTranslation('menu');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) return setContext(OFFLINE_ROUTE_KEY);
    return setContext(OFFLINE_ROUTE_KEY);
  }, []);

  if (!context) return <></>;

  return (
    <div>
      {contextMenu[context].map(({ href, nameKey }) => (
        <Link href={href} passHref key={href}>
          <Clickable>
            <MenuItem>{t(nameKey)}</MenuItem>
          </Clickable>
        </Link>
      ))}
    </div>
  );
};

export default ContextMenu;
