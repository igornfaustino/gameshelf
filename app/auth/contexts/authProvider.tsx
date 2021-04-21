import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

type State = {
  values?: {
    authToken?: string;
  };
  setValues?: Dispatch<SetStateAction<{}>>;
};

const INITIAL_STATE: State = {};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [values, setValues] = useState({});

  return <AuthContext.Provider value={{ values, setValues }}>{children}</AuthContext.Provider>;
};
