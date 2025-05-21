import { create } from 'zustand';


type PhotoStore = {
  photo: string | null;
  setPhoto: (photo: string) => void;
  clearPhoto: () => void;
};

export const usePhotoStore = create<PhotoStore>((set) => ({
  photo: null,
  setPhoto: (photo) => set({ photo: `file://${photo}` }),
  clearPhoto: () => set({ photo: null }),
}));
