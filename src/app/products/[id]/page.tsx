'use client';

import { Star, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, use } from 'react';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);
  // const { id } = use(params);
  // Mock product data
  const product = {
    // id: params.id,
    name: '高級無線耳機',
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 128,
    inStock: true,
    description:
      '體驗音樂的新境界。我們的高級無線耳機採用最新的降噪技術，提供清晰的音質和舒適的佩戴體驗。',
    features: [
      '主動降噪技術',
      '30 小時電池續航',
      '藍牙 5.3 連接',
      '舒適的人體工學設計',
      '防水等級 IPX4',
      '快速充電技術',
    ],
    colors: ['black', 'silver', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/premium-wireless-headphones.png',
      '/smart-watch-modern.jpg',
      '/portable-charger-sleek.jpg',
    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <>
      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-muted rounded-lg overflow-hidden aspect-square">
              <img
                src={mainImage || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`bg-muted rounded-lg overflow-hidden aspect-square border-2 transition-smooth ${
                    mainImage === image
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-secondary text-secondary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} 評論)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">
                  NT${product.price.toLocaleString()}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  NT${product.originalPrice.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  %
                </span>
              </div>
              <p className="text-green-600 font-semibold">有現貨</p>
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
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-smooth ${
                      selectedColor === color
                        ? 'border-primary'
                        : 'border-border'
                    }`}
                    style={{
                      backgroundColor:
                        color === 'black'
                          ? '#000'
                          : color === 'silver'
                          ? '#c0c0c0'
                          : color === 'blue'
                          ? '#3b82f6'
                          : '#fff',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                尺寸
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition-smooth ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
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
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-smooth">
                <ShoppingCart className="w-5 h-5" />
                加入購物車
              </button>
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

            {/* Features */}
            <div className="bg-muted rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-foreground">主要特性</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="font-semibold text-foreground">免運費</p>
                  <p className="text-sm text-muted-foreground">
                    訂單滿 NT$1000 免運費
                  </p>
                </div>
              </div>
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
  );
}
