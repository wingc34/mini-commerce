import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type SKU } from '@prisma/client';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  sku: {
    skuCode: string;
    price: number;
    attributes: SKU['attributes'];
  };
  image: string | null;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set(() => ({ items: [] })),
    }),
    { name: 'cart' }
  )
);
