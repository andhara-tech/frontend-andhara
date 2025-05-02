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
  logout: async () => {
    const response = await authService.logout()
    localStorage.removeItem('authToken');
    if(response === 204){
      set({ token: null, isAuthenticated: false, expiryTime: null, lastActive: Date.now() }); //Resetea el lastActive
    }
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
  }
}));

// Hook para verificar la expiración y renovar el token
export const useAuthCheck = () => {
  const { token, expiryTime, isAuthenticated, logout, lastActive } = useAuthStore(); // Obtiene refreshToken del store
  const inactivityTimeout = 60 * 60 * 1000;
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
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          logout();
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, token, expiryTime, logout, lastActive]); // Dependencia de refreshToken

  return null;
};