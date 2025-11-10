'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '高級無線耳機',
    price: 2499,
    originalPrice: 3299,
    image: '/premium-wireless-headphones.png',
    rating: 4.8,
    reviews: 128,
    badge: '熱銷',
    inStock: true,
  },
  {
    id: '2',
    name: '智能手錶',
    price: 1999,
    originalPrice: 2499,
    image: '/smart-watch-modern.jpg',
    rating: 4.6,
    reviews: 95,
    badge: '新品',
    inStock: true,
  },
  {
    id: '3',
    name: '便攜式充電器',
    price: 599,
    image: '/portable-charger-sleek.jpg',
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
  {
    id: '4',
    name: '無線充電板',
    price: 799,
    originalPrice: 999,
    image: '/wireless-charging-pad.png',
    rating: 4.7,
    reviews: 156,
    badge: '優惠',
    inStock: true,
  },
  {
    id: '5',
    name: '藍牙喇叭',
    price: 1299,
    originalPrice: 1599,
    image: '/premium-wireless-headphones.png',
    rating: 4.5,
    reviews: 87,
    inStock: true,
  },
  {
    id: '6',
    name: 'USB-C 集線器',
    price: 899,
    image: '/portable-charger-sleek.jpg',
    rating: 4.4,
    reviews: 62,
    inStock: false,
  },
  {
    id: '7',
    name: '防水手機殼',
    price: 399,
    originalPrice: 599,
    image: '/smart-watch-modern.jpg',
    rating: 4.7,
    reviews: 143,
    inStock: true,
  },
  {
    id: '8',
    name: '無線滑鼠',
    price: 499,
    image: '/wireless-charging-pad.png',
    rating: 4.6,
    reviews: 98,
    inStock: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="group">
      <div
        className="relative bg-muted rounded-lg overflow-hidden mb-4 aspect-square"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-10 bg-secondary text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}

        {/* Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="text-white font-semibold">缺貨</span>
          </div>
        )}

        {/* Image */}
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
        />

        {/* Overlay */}
        {isHovered && product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-smooth">
              <ShoppingCart className="w-5 h-5" />
              加入購物車
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.id}`} className="block group">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth mb-2 line-clamp-2">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-secondary text-secondary'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          ({product.reviews})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-foreground">
          HKD${product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-muted-foreground line-through">
            HKD${product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
