"use client";

import { useState } from "react";
import { ChevronDown, Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import volt_logo from "../../../public/assets/images/volt.png";

import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserDropdown } from "../DropdownAuthentication/page";
import Link from "next/link";
import Cart from "../ShoppingCart/page";
import Wishlist from "../Wishlist/page";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar({}: {}) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { cartOpen, setCartOpen, cartTotal, itemCount } = useCart();
  const { wishlistOpen, setWishlistOpen, wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(true);
    setWishlistOpen(false);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(true);
    setCartOpen(false);
  };

  const menuItems = [
    "CRAZY DEALS",
    "WELLNESS",
    "FITNESS",
    "SHOP BY CONCERN",
    "WEIGHT MANAGEMENT",
    "BRANDS",
    "BLOGS",
  ];

  return (
    <>
      <nav
        className={`bg-white shadow-md border-t-4 border-[#222222] sticky top-0 z-50 ${inter.className}`}
      >
        <div className="w-full flex justify-between items-center px-4 md:px-6 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image src={volt_logo} alt="logo" className="w-12 md:w-16 rounded-lg" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 text-[#222222] font-medium">
            {menuItems.map((menu) => (
              <Link
                key={menu}
                href="#"
                className="hover:text-gray-700 transition-colors"
              >
                {menu}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-[#222222]">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 hidden md:block" />
            
            <div className="hidden md:block">
              <UserDropdown />
            </div>

            <div className="relative">
              <Heart
                className="w-5 h-5 cursor-pointer hover:text-gray-600"
                onClick={handleWishlistClick}
              />
              {wishlistCount > 0 && (
                <div className="w-3.5 h-3.5 rounded-full absolute -top-1 -right-1 flex justify-center items-center bg-[#222222]">
                  <span className="text-white text-xs font-semibold">
                    {wishlistCount}
                  </span>
                </div>
              )}
            </div>

            <div className="relative">
              <ShoppingCart
                className="w-5 h-5 cursor-pointer hover:text-gray-600"
                onClick={handleCartClick}
              />
              {itemCount > 0 && (
                <div className="w-3.5 h-3.5 rounded-full absolute -top-1 -right-1 flex justify-center items-center bg-[#222222]">
                  <span className="text-white text-xs font-semibold">
                    {itemCount}
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((menu) => (
                <Link
                  key={menu}
                  href="#"
                  className="block py-2 text-[#222222] hover:bg-gray-50 rounded-md px-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {menu}
                </Link>
              ))}
              <div className="py-2 border-t border-gray-100 mt-2">
                <div className="px-3 py-2">
                  <UserDropdown />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <Cart />
      <Wishlist open={wishlistOpen} setOpen={setWishlistOpen} />
    </>
  );
}
