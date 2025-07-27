import { create } from 'zustand';
import type { AuthState } from '../types/auth';



export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));