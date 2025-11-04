import HeroBanner from '@/components/landing/Hero-banner';
import { FeaturedProducts } from '@/components/landing/Featured-products';
export default async function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center font-san">
      <main className="min-h-screen w-full">
        <HeroBanner />
        <FeaturedProducts />
      </main>
    </div>
  );
}
