import React, { createContext, useContext, useEffect, useState } from 'react';

type ITokenContext = {
  token: string | null;
  setToken: (token: string | null) => void;
}

type ITokenProps = {
  children: React.ReactNode;
}

const AuthContext = createContext<ITokenContext>({
  token: null,
  setToken: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<ITokenProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  // update local storage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

