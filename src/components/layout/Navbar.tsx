'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Moon, Sun } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useTheme } from '@/lib/theme-provider';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const pageDetails = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const { isDark, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log('Session in Navbar:', session);
  return (
    <nav className="border-b bg-background shadow-sm sticky top-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 grid-cols-3">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-textPrimary"
      >
        MyApp
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-textSecondary font-medium space-x-8">
        {pageDetails.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className={`hover:text-blue-600 transition ${
              pathname === page.href ? 'text-blue-600' : ''
            }`}
          >
            {page.name}
          </Link>
        ))}
      </div>
      <div className="hidden md:flex text-gray-700 font-medium space-x-4">
        {/* Theme Toggle Button */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-smooth cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-foreground" />
            ) : (
              <Moon className="w-6 h-6 text-foreground" />
            )}
          </Button>
        )}
        {session && status === 'authenticated' ? (
          <div className="flex space-x-4 items-center">
            <Button variant="ghost" size="icon">
              <Link href="/cart">
                <ShoppingCart className="w-6 h-6 text-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/profile?tab=overview">
                <User className="w-6 h-6 text-foreground" />
              </Link>
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        {session && status === 'authenticated' ? (
          <>
            <Button variant="ghost" size="icon">
              <ShoppingCart />
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/login">
                <User />
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild className="mx-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-6 h-6 text-foreground" />
            ) : (
              <Moon className="w-6 h-6 text-foreground" />
            )}
          </button>
        )}
        <Sheet
          open={isMenuOpen}
          onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
        >
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-4 text-textSecondary">
              {pageDetails.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className="hover:text-blue-600 transition px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
