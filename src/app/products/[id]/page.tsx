'use client';

import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import Carousel from '@/components/products/detail/Carousel';
import { useCart } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { useState, use, useMemo, useCallback } from 'react';
import { trpc } from '@/app/_trpc/client-api';
import { type SKU } from '@prisma/client';
export interface ProductDetail {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  images: string[];
  category: string | null;
  skus: SKU[];
}

const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { items, addToCart } = useCart();
  const { data, isLoading } = trpc.product.getProductDetail.useQuery({
    id: id,
  });

  const product = data?.data as ProductDetail;

  // derive available attributes
  const attributeMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};

    product?.skus.forEach((sku) => {
      const attrs = sku.attributes as Record<string, string>;
      for (const key in attrs) {
        if (!map[key]) map[key] = new Set();
        map[key].add(attrs[key]);
      }
    });

    return map;
  }, [product?.skus]);

  const sizes = useMemo(() => {
    return defaultSizes.filter((size) => attributeMap['size']?.has(size));
  }, [attributeMap]);

  const colors = useMemo(() => {
    return Array.from(attributeMap['color'] || []);
  }, [attributeMap]);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const attr = product?.skus.map((item) => item.attributes);

  const { data: stockData } = trpc.product.checkStock.useQuery({
    productId: id,
    size: selectedSize,
    color: selectedColor,
  });

  const [stockAvailable, setStockAvailable] = useState<{
    size: string[];
    color: string[];
  }>(() => ({
    size: ['start'],
    color: ['start'],
  }));

  const price = useMemo(() => {
    if (!product) return 0;
    const selectedSku = { size: selectedSize, color: selectedColor };
    const sku = product?.skus.find((sku) => {
      const attrs = sku.attributes as Record<string, string>;
      return Object.entries(selectedSku).every(
        ([key, value]) => attrs[key] === value
      );
    });
    return sku ? sku.price : Math.min(...product?.skus.map((sku) => sku.price));
  }, [selectedSize, selectedColor, product?.skus]);

  return product && !isLoading ? (
    <>
      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <Carousel slides={product.images || []} />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">
                  HKD${(price / 100).toLocaleString()}
                </span>
              </div>
              {stockData?.inStock ? (
                <p className="text-green-600 font-semibold">有現貨</p>
              ) : (
                <p className="font-semibold">沒有現貨</p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                顏色
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant="ghost"
                    onClick={() => {
                      setSelectedColor(color);
                      setStockAvailable({
                        color: [color],
                        size: attr
                          .filter((item) => {
                            const attrs = item as Record<string, string>;
                            return attrs.color === color;
                          })
                          .map((item) => {
                            const attrs = item as Record<string, string>;
                            return attrs.size;
                          }),
                      });
                    }}
                    className={`cursor-pointer ${
                      selectedColor === color
                        ? 'bg-primary text-white hover:text-white'
                        : 'bg-transparent'
                    } ${
                      stockAvailable.color.includes(color) ||
                      stockAvailable.color.includes('start')
                        ? 'font-extrabold'
                        : 'text-gray-700'
                    }`}
                    title={color}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                尺寸
              </label>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="ghost"
                    onClick={async () => {
                      setSelectedSize(size);
                      setStockAvailable({
                        size: [size],
                        color: attr
                          .filter((item) => {
                            const attrs = item as Record<string, string>;
                            return attrs.size === size;
                          })
                          .map((item) => {
                            const attrs = item as Record<string, string>;
                            return attrs.color;
                          }),
                      });
                    }}
                    className={`cursor-pointer ${
                      selectedSize === size
                        ? 'bg-primary text-white hover:text-white'
                        : 'bg-transparent'
                    } ${
                      stockAvailable.size.includes(size) ||
                      stockAvailable.color.includes('start')
                        ? 'font-extrabold'
                        : 'text-gray-700'
                    }`}
                    title={size}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                數量
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-smooth"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-smooth"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 items-center">
              <Button
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-smooth"
                // onClick={() =>
                //   addToCart({
                //     id: '1',
                //     name: product.name,
                //     price: product.price,
                //     quantity: quantity,
                //     image: product.images[0],
                //   })
                // }
              >
                <ShoppingCart className="w-5 h-5" />
                加入購物車
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-smooth ${
                  isWishlisted
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'border-border text-muted-foreground hover:border-primary'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`}
                />
              </button>
              <button className="w-14 h-14 border-2 border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary transition-smooth">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">↩️</span>
                <div>
                  <p className="font-semibold text-foreground">30 天退貨保證</p>
                  <p className="text-sm text-muted-foreground">
                    不滿意可在 30 天內退貨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading</div>
  );
}
