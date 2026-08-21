import { Address } from './user';

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELED';
export type DraftStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_FAILED'
  | 'COMPLETED'
  | 'EXPIRED';

export interface DraftOrder {
  id: string;
  userId: string;
  total: number;
  status: DraftStatus;
  shippingAddressId: string;
  shippingAddress: Address;
  paymentIntentId: string | null;
  createdAt: string;
  expiresAt: string | null;
  orderItems: OrderItem[];
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  shippingAddressId: string;
  shippingAddress: Address;
  paymentIntentId: string | null;
  stripeSessionId: string | null;
  createdAt: string;
  draftOrderId: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  skuId: string;
  quantity: number;
  price: number;
  sku: {
    id: string;
    skuCode: string;
    price: number;
    attributes: Record<string, string>;
    product: {
      name: string;
      images: string[];
    };
  };
}
