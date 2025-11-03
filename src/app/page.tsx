import HeroBanner from '@/app/components/Hero-banner';
import { FeaturedProducts } from '@/app/components/Featured-products';
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
