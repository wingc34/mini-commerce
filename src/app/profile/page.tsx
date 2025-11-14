'use client';

import { ProfileSidebar } from '@/components/profile/profile-sidebar';
import { ProfileOverview } from '@/components/profile/profile-overview';
import { OrderHistory } from '@/components/profile/order-history';
import { Addresses } from '@/components/profile/addresses';
import { Wishlist } from '@/components/profile/wishlist';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && <ProfileOverview />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'addresses' && <Addresses />}
            {activeTab === 'wishlist' && <Wishlist />}
          </div>
        </div>
      </div>
    </>
  );
}
