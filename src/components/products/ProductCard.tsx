import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { type SKU } from '@prisma/client';

export interface Product {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  images: string[];
  category: string | null;
  skus: {
    price: number;
    skuCode: string;
    attributes: SKU['attributes'];
  }[];
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <div className="group">
      <div
        className="relative bg-muted rounded-lg overflow-hidden mb-4 aspect-square cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push('/products/1')}
      >
        {/* Image */}
        <Image
          src={product.images[0] || 'https://placehold.co/600x400'}
          alt={product.name}
          loading="eager"
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
        />

        {/* Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-smooth cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                console.log('addToCart');
                addToCart({
                  id: product.id,
                  name: product.name,
                  quantity: 1,
                  image: product.images[0] || null,
                  sku: product.skus[0],
                });
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              加入購物車
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="font-semibold text-textPrimary group-hover:text-primary transition-smooth mb-2 line-clamp-2">
        {product.name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">
          HKD$
          {product.skus.reduce((min, current) => {
            return current.price < min.price ? current : min;
          }).price / 100}
        </span>
      </div>
    </div>
  );
}
