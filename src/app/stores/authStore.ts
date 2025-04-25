import { authService } from '@/features/auth/services/authService';
import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  initalize: () => void;
  isLoading: boolean;
  error: string | null;
  user: {
    email: string;
    role: string;
  } | null;

  expiryTime: number | null;
  lastActive: number;
  setLastActive: () => void;
  refreshToken: (token: string) => Promise<void>; 
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  expiryTime: null,
  lastActive: Date.now(),
  setLastActive: () => set({ lastActive: Date.now() }),
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.loginRequest(email, password);
      const token = response.data.token
      const decodedToken: { exp: number, [key: string]: any } = jwtDecode(token)
      const expiryTime = decodedToken.exp * 1000
      set({
        user: response.data.user,
        token: token,
        isAuthenticated: true,
        isLoading: false,
        expiryTime: expiryTime,
        lastActive: Date.now()
      });
    } catch (error: any) {
      set({
        error: 'Login failed. Please check your credentials and try again.',
        isLoading: false,
        isAuthenticated: false,
        token: null,
        expiryTime: null
      });
    }
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, isAuthenticated: false, expiryTime: null, lastActive: Date.now() }); //Resetea el lastActive
  },
  initalize: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: { exp: number, [key: string]: any } = jwtDecode(token)
        const expiryTime = decodedToken.exp * 1000
        if (expiryTime > Date.now()) {
          set({ token: token, isAuthenticated: true, expiryTime: expiryTime });
        } else {
          localStorage.removeItem('authToken')
          set({ token: null, isAuthenticated: false, expiryTime: null, lastActive: Date.now() }); //Resetea el lastActive
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        set({ token: null, isAuthenticated: false, expiryTime: null, lastActive: Date.now() });//Resetea el lastActive
      }
    }
  },
  refreshToken: async (currentToken: string) => { // Implementación de la función refreshToken
    try {
      const response = await authService.refreshTokenRequest(currentToken); // Usa el servicio authService
      const newToken = response.data.token;
      const decodedToken: { exp: number } = jwtDecode(newToken);
      const newExpiryTime = decodedToken.exp * 1000;
      localStorage.setItem('authToken', newToken);
      set({ token: newToken, expiryTime: newExpiryTime, lastActive: Date.now() }); // Actualiza el estado con el nuevo token y tiempo
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      get().logout(); // Usa get() para acceder a la función logout del store
    }
  },
}));

// Hook para verificar la expiración y renovar el token
export const useAuthCheck = () => {
  const { token, expiryTime, isAuthenticated, logout, refreshToken, lastActive } = useAuthStore(); // Obtiene refreshToken del store
  const inactivityTimeout = 5 * 60 * 1000;
  const refreshThreshold = 60 * 1000;

  useEffect(() => {
    if (!isAuthenticated || !token || !expiryTime) {
      return;
    }

    const intervalId = setInterval(async () => {
      const now = Date.now();
      const timeUntilExpiry = expiryTime - now;
      const isInactive = now - lastActive > inactivityTimeout;

      if (isInactive || timeUntilExpiry <= 0) {
        logout();
        return;
      }

      if (timeUntilExpiry <= refreshThreshold) {
        try {
          await refreshToken(token); // Llama a la función refreshToken del store
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          logout();
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, token, expiryTime, logout, refreshToken, lastActive]); // Dependencia de refreshToken

  return null;
};