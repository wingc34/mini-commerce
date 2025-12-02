'use client';

import Link from 'next/link';
import { trpc } from '@/trpc/client-api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Product, ProductCard } from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const router = useRouter();
  const { data: products, isLoading } =
    trpc.product.getRecommendProducts.useQuery();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-textPrimary">
          Featured Products
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-textSecondary">
          Carefully selected bestsellers with guaranteed quality and great
          prices
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? 'loading'
          : (products?.data as unknown as Product[])?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild onClick={() => router.push('/products')}>
          <Link href="/products">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
