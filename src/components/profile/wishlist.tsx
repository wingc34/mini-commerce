'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { useAuth } from '@/context/auth-context';
import { useWishlist } from '@/hooks/useWishlist';

export function Wishlist() {
  const { user, status, refetch } = useAuth();
  const router = useRouter();
  const { removeWishItem } = useWishlist();

  return (
    <>
      <LoadingOverlay
        isLoading={removeWishItem.isPending || status === 'loading'}
        className="w-full h-full"
      />
      <h2 className="text-2xl font-bold text-textPrimary">Wishlist</h2>

      {user &&
        (user?.wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-textSecondary mx-auto mb-4" />
            <p className="text-textSecondary">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.wishlist.length > 0 &&
              user?.wishlist.map((item) => (
                <div
                  key={item.productId}
                  className="border border-border rounded-lg overflow-hidden hover:border-primary transition-smooth cursor-pointer"
                  onClick={() => router.push(`/products/${item.productId}`)}
                >
                  <div className="relative bg-muted aspect-square overflow-hidden">
                    <Image
                      src={item.product.images[0] || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-smooth duration-500"
                      width={500}
                      height={500}
                    />
                    <Button
                      onClick={async (event) => {
                        event.stopPropagation();
                        await removeWishItem.mutateAsync(item.productId);
                        refetch();
                      }}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-800 transition-smooth cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-textPrimary hover:text-primary transition-smooth mb-2 line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-textPrimary mb-4">
                      HKD$
                      {Math.min(
                        ...item.product.skus.map((s) => s.price)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </>
  );
}
