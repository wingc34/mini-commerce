export interface SKU {
  id: string;
  productId: string;
  skuCode: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  category: string | null;
  skus: SKU[];
  createdAt: string;
  updatedAt: string;
}
