import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  loggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false, // Define inicialmente como falso
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // Inicialmente, o usuário não está logado

  const login = (userData: User) => {
    setUser(userData);
    setLoggedIn(true); // Define como verdadeiro ao fazer login
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false); // Define como falso ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
