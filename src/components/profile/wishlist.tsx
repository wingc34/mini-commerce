'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client-api';

export function Wishlist() {
  const { data, update } = useSession();
  const router = useRouter();
  const { mutateAsync: removeWishItem } =
    trpc.user.removeWishItem.useMutation();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-textPrimary">願望清單</h2>

      {data?.user &&
        (data?.user?.wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-textSecondary mx-auto mb-4" />
            <p className="text-textSecondary">您的願望清單是空的</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.user?.wishlist.length > 0 &&
              data?.user?.wishlist.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg overflow-hidden hover:border-primary transition-smooth cursor-pointer"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <div className="relative bg-muted aspect-square overflow-hidden">
                    <Image
                      src={item.images[0] || '/placeholder.svg'}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-smooth duration-500"
                      width={500}
                      height={500}
                    />
                    <Button
                      onClick={async (event) => {
                        event.stopPropagation();
                        await removeWishItem({ productId: item.id });
                        update();
                      }}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-800 transition-smooth cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-textPrimary hover:text-primary transition-smooth mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-textPrimary mb-4">
                      HKD${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
