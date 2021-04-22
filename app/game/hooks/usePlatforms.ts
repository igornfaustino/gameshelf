import { useQuery } from '@apollo/client';

import { ALL_PLATFORMS } from '../graphql/games';
import { Platform } from '../types/game';

type PlatformQueryType = {
  platforms: Platform[];
};

const usePlatforms = () => {
  const { data: platforms, loading } = useQuery<PlatformQueryType>(ALL_PLATFORMS);
  return { platforms: platforms?.platforms || [], loading };
};

export default usePlatforms;
