import { useCookies } from 'react-cookie';

const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  const saveToken = (token) => {
    setCookie('auth', token);
  };

  const clearToken = () => {
    removeCookie('auth');
  };

  return { authToken: cookies.auth, saveToken, clearToken };
};

export default useAuthToken;
