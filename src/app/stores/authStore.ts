import { loginRequest } from '@/features/auth/services/authService';
import {create} from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email:string, password:string) => void;
  logout: () => void;
  initalize: () => void;
  isLoading: boolean;
  error: string | null;
  user: {
    email: string;
    role: string;
  } | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  login: async (email:string, password:string) => {
    set({isLoading: true, error: null});
    try{
      const response = await loginRequest(email, password);
      set({
        user: response.data.user,
        token: response.data.token, 
        isAuthenticated: true, 
        isLoading: false});
    }catch (error) {
      set({error: 'Login failed. Please check your credentials and try again.', isLoading: false, isAuthenticated: false});
    }
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({token: null, isAuthenticated: false});
  },
  initalize: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({token: token, isAuthenticated: true});
    }
  },
}));