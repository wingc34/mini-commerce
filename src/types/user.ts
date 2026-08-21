import { Product } from './product';

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  phoneNumber: string | null;
  wishlist: WishlistItem[];
  defaultAddress: Address | null;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postal: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}
