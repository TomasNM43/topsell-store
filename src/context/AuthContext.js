'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializar estado con función para leer localStorage una sola vez
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('topsell_user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error("Error al leer datos de usuario", error);
          localStorage.removeItem('topsell_user');
        }
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('topsell_token');
      if (storedToken) {
        return storedToken;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false); // Ya no necesitamos loading state
  const router = useRouter();

  // 2. FUNCIÓN LOGIN: Se llama cuando el Backend devuelve OK
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    
    // Guardar en el navegador (Persistencia)
    localStorage.setItem('topsell_token', tokenData);
    localStorage.setItem('topsell_user', JSON.stringify(userData));
  };

  // 3. FUNCIÓN LOGOUT: Borrar todo y sacar al usuario
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('topsell_token');
    localStorage.removeItem('topsell_user');
    
    // Opcional: Limpiar también el carrito si quieres
    // localStorage.removeItem('topsell_cart'); 
    
    router.push('/login');
  };

  // Helper para verificar si está autenticado
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAuthenticated,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);