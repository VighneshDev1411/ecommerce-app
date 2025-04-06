"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  cart: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];
  removeFromCart: (id: number) => void;
}

export default function Cart({
  open,
  setOpen,
  cart,
  removeFromCart,
}: CartProps) {
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 bg-white shadow-xl">
              <div className="flex h-full flex-col overflow-y-scroll">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </DialogTitle>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="mt-8">
                    {cart.length > 0 ? (
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.name}
                                src={product.image}
                                className="size-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <span className="text-xs">{product.name}</span>
                                <p className="ml-4">₹{product.price}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(product.id)}
                                  className="font-medium text-red-500 hover:text-red-700"
                                >
                                  ❌ Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-lg">
                        Your cart is empty.
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtotal & Checkout */}
                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{subtotal.toFixed(2)}</p>
                    </div>
                    <button className="mt-6 w-full bg-[#222222] text-white py-3 rounded-md shadow-md hover:bg-[#333333]">
                      Checkout
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-6 text-[#222222] hover:text-[#000000] text-sm"
                    >
                      Continue Shopping &rarr;
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
