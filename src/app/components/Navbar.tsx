'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 grid-cols-3">
      <Link href="/" className="text-xl font-bold tracking-tight">
        MyApp
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-gray-700 font-medium space-x-8">
        <Link href="/" className="hover:text-blue-600 transition">
          首頁
        </Link>
        <Link href="/products" className="hover:text-blue-600 transition">
          產品
        </Link>
      </div>
      <div className="hidden md:flex text-gray-700 font-medium space-x-8">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        {/* <div className="flex space-x-4 items-center">
          <Button variant="ghost" size="icon">
            <ShoppingCart />
          </Button>
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        {/* <Button variant="ghost" size="icon">
          <ShoppingCart />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button> */}
        <Button asChild className="mx-2">
          <Link href="/login">Login</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4">
              <Link href="/" className="hover:text-blue-600 transition">
                首頁
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition">
                產品
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
