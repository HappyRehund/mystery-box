// components/custom/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">MysteryBox</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="mr-2"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <UserButton
              appearance={{
                elements: {
                  triggerButton: "w-10 h-10", // Atur ukuran tombol
                  avatarBox: "w-10 h-10", // Atur ukuran avatar
                  userAvatar: "w-10 h-10", // Jika avatar spesifik perlu diubah
                },
              }}
            />
            <div className="md:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Categories
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </nav>
  );
}
