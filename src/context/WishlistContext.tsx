"use client"; // Enable client-side functionality

// Import necessary dependencies
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  category?: string;
  rating: number;
}

// Define the WishlistContext interface
interface WishlistContextType {
  wishlist: Product[];
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (productId: string) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Create the WishlistProvider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  // State management
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Load wishlist from API when user is authenticated
  useEffect(() => {
    const fetchWishlist = async () => {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/wishlist");
          if (response.ok) {
            const data = await response.json();
            setWishlist(data);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, [status]);

  // Add item to wishlist
  const addToWishlist = async (product: Product) => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          action: "add",
        }),
      });

      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist);
        setWishlistOpen(true);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId: string) => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: { id: productId },
          action: "remove",
        }),
      });

      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Move item from wishlist to cart
  const moveToCart = async (productId: string) => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/wishlist/move-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });

      if (response.ok) {
        const updatedWishlist = await response.json();
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    if (status !== "authenticated") return;

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "clear",
        }),
      });

      if (response.ok) {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    }
  };

  // Calculate total number of items in wishlist
  const wishlistCount = wishlist.length;

  // Provide context values
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistOpen,
        setWishlistOpen,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}; 