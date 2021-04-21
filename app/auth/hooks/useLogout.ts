import { useApolloClient } from '@apollo/client';

import useAuthToken from './useAuthToken';

const useLogout = () => {
  const client = useApolloClient();
  const { clearToken } = useAuthToken();

  const logout = () => {
    clearToken();
    return client.cache.reset();
  };

  return logout;
};

export default useLogout;
