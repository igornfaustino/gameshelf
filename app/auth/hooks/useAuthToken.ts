import { useContext, useEffect } from 'react';

import { AuthContext } from '../contexts/authProvider';

const useAuthToken = () => {
  const { values, setValues } = useContext(AuthContext);

  const saveToken = (token) => {
    setValues({ ...values, authToken: token });
    localStorage.setItem('auth', token);
  };

  const clearToken = () => {
    setValues({ ...values, authToken: undefined });
    localStorage.clear();
  };

  useEffect(() => {
    if (!setValues) return;
    const authToken = localStorage.getItem('auth');
    setValues((oldValues) => ({ ...oldValues, authToken }));
  }, [setValues]);

  return { authToken: values?.authToken, saveToken, clearToken };
};

export default useAuthToken;
