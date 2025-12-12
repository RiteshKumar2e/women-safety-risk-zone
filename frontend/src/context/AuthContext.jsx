import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, role, token }

  useEffect(() => {
    const stored = localStorage.getItem('ws_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('ws_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ws_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
