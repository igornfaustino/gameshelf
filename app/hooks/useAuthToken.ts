import { useEffect, useState } from 'react';

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | undefined>();

  useEffect(() => {
    setAuthToken(localStorage.getItem('auth'));

    window.addEventListener('storage', () => {
      setAuthToken(localStorage.getItem('auth'));
    });
  }, []);

  return { authToken };
};

export default useAuthToken;
