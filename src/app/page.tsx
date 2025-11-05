import HeroBanner from '@/components/landing/Hero-banner';
import { FeaturedProducts } from '@/components/landing/Featured-products';
export default async function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
    </>
  );
}
