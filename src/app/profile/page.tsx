'use client';

import { ProfileSidebar } from '@/components/profile/profile-sidebar';
import { ProfileOverview } from '@/components/profile/profile-overview';
import { OrderHistory } from '@/components/profile/order-history';
import { Addresses } from '@/components/profile/addresses';
import { Wishlist } from '@/components/profile/wishlist';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const tab = use(searchParams).tab || 'overview';
  const [activeTab, setActiveTab] = useState(tab);
  const router = useRouter();
  const handleTabChange = (tab: string) => {
    router.push(`/profile?tab=${tab}`);
    setActiveTab(tab);
  };

  return (
    <>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 relative min-h-[600px] p-4">
            {activeTab === 'overview' && (
              <ProfileOverview setActiveTab={handleTabChange} />
            )}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'addresses' && <Addresses />}
            {activeTab === 'wishlist' && <Wishlist />}
          </div>
        </div>
      </div>
    </>
  );
}
