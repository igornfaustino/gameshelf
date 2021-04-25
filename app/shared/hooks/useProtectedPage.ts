import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useAuthToken from '../../auth/hooks/useAuthToken';

const useProtectedPage = (redirectTo = '/') => {
  const { authToken } = useAuthToken();
  const { replace } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authToken) return setLoading(false);
    replace(redirectTo);
  }, [authToken, redirectTo, replace]);

  return loading;
};

export default useProtectedPage;
