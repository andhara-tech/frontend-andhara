import {create} from 'zustand';

interface AuthState {
  tocken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  initalize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  tocken: null,
  isAuthenticated: false,
  login: (token: string) => {
    localStorage.setItem('authToken', token);
    set({tocken: token, isAuthenticated: true});
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({tocken: null, isAuthenticated: false});
  },
  initalize: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({tocken: token, isAuthenticated: true});
    }
  },
}));