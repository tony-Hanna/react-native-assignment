import { create } from 'zustand';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const SecureStorage: StateStorage = {
  setItem: async (name, value) => {
    try {
      await RNSecureStorage.setItem(name, value, {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error('Error setting secure storage item:', error);
    }
  },

  getItem: async name => {
    try {
      const value = await RNSecureStorage.getItem(name);
      return value ?? null;
    } catch (error: any) {
      if (error?.message?.includes(`Value for ${name} does not exist`)) {
         console.log(`Secure storage item '${name}' not found on startup.`);
         return null;
      } 
      console.error('Error getting secure storage item:', error);
      return null;
    }
  },

  removeItem: async name => {
    try {
      await RNSecureStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing secure storage item:', error);
    }
  },
};

type AuthState = {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  hasStoreLoaded: boolean;
  setHasStoreLoaded: () => void;
  setUserId: (userId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userId: null,
      hasStoreLoaded: false,
      setHasStoreLoaded: () => set({ hasStoreLoaded: true }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // Ensure we always set hasStoreLoaded to true, even if rehydration fails
        if (state) {
          state.setHasStoreLoaded();
        } else {
          // If state is null, something went wrong with rehydration
          console.warn('Auth store rehydration failed');
          useAuthStore.getState().setHasStoreLoaded();
        }
      },
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);
