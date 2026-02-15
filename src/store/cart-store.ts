import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type SKU } from '@prisma/client';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  sku: {
    id: string;
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
  updateQuantity: (id: string, skuCode: string, quantity: number) => void;
}

export const useCart = create<CartStore>()(
  persist<CartStore>(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.sku.skuCode === item.sku.skuCode
          );

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
      removeItem: (skuCode) =>
        set((state) => {
          return {
            items: state.items.filter((item) => item.sku.skuCode !== skuCode),
          };
        }),
      updateQuantity: (id, skuCode, quantity) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id && item.sku.skuCode === skuCode
                  ? { ...item, quantity }
                  : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),
      clearCart: () => set(() => ({ items: [] })),
    }),
    { name: 'cart' }
  )
);
