"use client";

import { useState } from "react";
import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import volt_logo from "../../../public/assets/images/volt.png";
import { useCart } from "@/context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserDropdown } from "../DropdownAuthentication/page";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Navbar({}: {}) {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isLoggedIn] = useState(false); // Temporary - replace with real auth later
  const { cartOpen, setCartOpen, cartTotal, itemCount } = useCart();
  const toggleDropdown = (menu: string) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <nav
      className={`bg-0A2463 shadow-md border-t-4 border-[#222222] ${inter.className}`}
    >
      <div className="w-full flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image src={volt_logo} alt="logo" className="w-16 rounded-lg" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-white font-medium">
          {[
            "CRAZY DEALS",
            "WELLNESS",
            "FITNESS",
            "SHOP BY CONCERN",
            "WEIGHT MANAGEMENT",
            "BRANDS",
          ].map((menu) => (
            <div className="relative" key={menu}>
              <button
                onClick={() => toggleDropdown(menu)}
                className="hover:text-gray-700 flex items-center space-x-1 text-[#222222]"
              >
                <span>{menu}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === menu && (
                <div className="absolute bg-white shadow-lg p-3 mt-2 w-48 z-10">
                  <p className="text-gray-600 hover:text-red-600">
                    Submenu Item 1
                  </p>
                  <p className="text-gray-600 hover:text-red-600">
                    Submenu Item 2
                  </p>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="hover:text-gray-600 text-[#222222]">
            BLOGS
          </a>
        </div>

        <div className="flex items-center space-x-4 text-white-800">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-600 text-[#222222]" />

          <UserDropdown />

          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 cursor-pointer hover:text-gray-600 text-[#222222]"
              onClick={() => setCartOpen(true)}
            />
            <div className="w-3.5 h-3.5 rounded-full absolute -top-1 -right-1 flex justify-center items-center bg-[#222222]">
              <span className="text-white text-xs font-semibold">
                {itemCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
