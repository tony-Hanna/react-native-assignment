import { create } from 'zustand';


type PhotoStore = {
  profilePhoto: string | null;
  productPhoto: string | null;
  editProductPhoto: string | null;
  setProfilePhoto: (photo: string) => void;
  setProductPhoto: (photo: string) => void;
  setEditProductPhoto: (photo: string) => void;
  clearProfilePhoto: () => void;
  clearProductPhoto: () => void;
  clearEditProductPhoto: () => void;
};

export const usePhotoStore = create<PhotoStore>((set) => ({
  profilePhoto: null,
  productPhoto: null,
  editProductPhoto: null,
  setProfilePhoto: (photo) => set({ profilePhoto: `file://${photo}` }),
  setProductPhoto: (photo) => set({ productPhoto: `file://${photo}` }),
  setEditProductPhoto: (photo) => set({ editProductPhoto: `file://${photo}` }),
  clearProfilePhoto: () => set({ profilePhoto: null }),
  clearProductPhoto: () => set({ productPhoto: null }),
  clearEditProductPhoto: () => set({ editProductPhoto: null }),
}));
