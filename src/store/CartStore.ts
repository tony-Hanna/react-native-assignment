import { create } from "zustand";
import { MMKV } from 'react-native-mmkv';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from "../screens/Cart/Cart.type";
import { useAuthStore } from "./AuthStore";
// Initialize MMKV storage
const storage = new MMKV();

// Helper to get the current user-specific storage key
const getCartStorageKey = () => {
  // Use getState to avoid hook-in-hook issues
  const userId = require('./AuthStore').useAuthStore.getState().userId;
  return userId ? `cart-storage-${userId}` : 'cart-storage-guest';
};

// Define the cart store state and actions
interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (itemId: string) => boolean;
}

// Create the cart store with user-specific persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id);
          
          if (existingItem) {
            // If item exists, increase quantity
            return {
              items: state.items.map((i) =>
                i._id === item._id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          
          // If item doesn't exist, add new item with quantity 1
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item._id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      isInCart: (itemId) => {
        return get().items.some((item) => item._id === itemId);
      },
    }),
    {
      name: getCartStorageKey(),
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          storage.delete(name);
        },
      })),
    }
  )
);