"use client";

import { useShopStore } from "@/store/shopStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useShopStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl z-[1000] flex flex-col border-l border-gray-200 dark:border-zinc-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Your Cart</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-lg">Your cart is empty</p>
                  <Button variant="outline" onClick={toggleCart}>Continue Shopping</Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className={`w-20 h-20 rounded-xl ${item.image} shadow-inner shrink-0`} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors rounded-l-lg"
                          >
                            <Minus size={14} className="text-gray-600 dark:text-gray-400" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium dark:text-gray-200">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors rounded-r-lg"
                          >
                            <Plus size={14} className="text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    ${cartTotal().toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-indigo-500/25"
                  onClick={() => alert('Redirecting to Stripe/Shopify checkout...')}
                >
                  Checkout Now
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
