import { mockUsers } from '@/mocks/users';
import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Mock login - in a real app, this would be a Firebase Auth call
          const user = mockUsers.find(u => u.email === email);

          if (!user) {
            throw new Error('Invalid email or password');
          }

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },

      register: async (email, password, username) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Check if email or username already exists
          if (mockUsers.some(u => u.email === email)) {
            throw new Error('Email already in use');
          }

          if (mockUsers.some(u => u.username === username)) {
            throw new Error('Username already taken');
          }

          // Create new user - in a real app, this would be a Firebase Auth call
          const newUser: User = {
            id: `user${mockUsers.length + 1}`,
            username,
            email,
            displayName: username,
            photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
            bio: '',
            followers: 0,
            following: 0,
            createdAt: Date.now(),
          };

          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          set(state => ({
            user: state.user ? { ...state.user, ...data } : null,
            isLoading: false
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);