import { create } from 'zustand';
import { Region } from 'react-native-maps';

type LocationStore = {
  location: Region | null;
  setLocation: (location: Region) => void;
  clearLocation: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
  clearLocation: () => set({ location: null }),
}));
