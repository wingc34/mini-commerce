'use client';

import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'overview', label: 'Profile Info', icon: User },
  { id: 'orders', label: 'Order History', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
];

export function ProfileSidebar({
  activeTab,
  onTabChange,
}: ProfileSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border h-fit sticky top-20">
      <div className="lg:hidden p-6 border-b border-border flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-muted rounded-lg transition-smooth flex items-center gap-2 w-full justify-between"
          aria-label="Toggle menu"
        >
          <h3 className="font-semibold text-textPrimary">Menu</h3>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block p-6`}>
        <div className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={'ghost'}
                onClick={() => {
                  onTabChange(item.id);
                  setIsExpanded(false);
                }}
                className={`w-full flex justify-start gap-3 px-4 py-3 rounded-lg transition-smooth cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="border-t border-border mt-6 pt-6">
          <Button
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
            variant={'ghost'}
            className="w-full flex justify-start gap-3 px-6 rounded-lg text-red-600 hover:text-red-600 transition-smooth cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
