import React from 'react';

import styled from 'styled-components';

import { Platform } from '../../game/types/game';

const PlatformIndicatorContainer = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 0.8rem;
  height: 0.8rem;
  margin-bottom: 8px;
`;

const Tag = styled.span`
  margin-right: 4px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.fontBlack};
`;

type Props = {
  platforms: Platform[];
};

const PlatformIndicator = (props: Props) => {
  const { platforms = [] } = props;
  return (
    <PlatformIndicatorContainer>
      {platforms?.map((platform) => (
        <Tag key={platform.name}>{platform.abbreviation || platform.name}</Tag>
      ))}
    </PlatformIndicatorContainer>
  );
};

export default PlatformIndicator;
