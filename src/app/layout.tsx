// app/layout.tsx (Server component - NO "use client")
import "./globals.css";
import ClientLayout from "../components/ClientLayout"; // ✅ New file you'll create
// import { AuthProvider } from "@/providers/AuthProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
export const metadata = {
  title: "VOLT Supplements",
  description: "Your health. Your power.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
            <ClientLayout>{children}</ClientLayout>
          </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
