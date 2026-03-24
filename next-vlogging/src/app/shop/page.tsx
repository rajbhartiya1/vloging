"use client";

import { useShopStore } from "@/store/shopStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Copy, CheckCircle2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import { motion } from "framer-motion";

const MERCH_ITEMS = [
  { id: "m1", name: "VlogHub Classic Hoodie", price: 45.99, image: "bg-indigo-900", tag: "Best Seller" },
  { id: "m2", name: "Creator Cap", price: 24.99, image: "bg-zinc-800", tag: "New" },
  { id: "m3", name: "\"Like & Subscribe\" Mug", price: 15.99, image: "bg-orange-800" },
  { id: "m4", name: "Travel Planner Journal", price: 20.00, image: "bg-emerald-900" },
  { id: "m5", name: "Neon Desk Mat", price: 35.50, image: "bg-purple-900", tag: "Limited" },
  { id: "m6", name: "VlogHub Stickers Pack", price: 9.99, image: "bg-pink-900" },
];

export default function ShopPage() {
  const { addToCart, toggleCart, cart } = useShopStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="space-y-12 pb-12">
      <CartDrawer />
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
            Creator Store
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Support your favorite creators.</p>
        </div>
        <button 
          onClick={toggleCart}
          className="relative group p-4 bg-white dark:bg-zinc-900 rounded-full shadow-md hover:shadow-xl dark:border dark:border-zinc-800 transition-all"
        >
          <ShoppingCart className="text-indigo-600 dark:text-indigo-400" />
          {totalItems > 0 && (
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-zinc-950"
            >
              {totalItems}
            </motion.div>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MERCH_ITEMS.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none dark:border dark:border-zinc-800 transition-all duration-300">
            <div className={`w-full aspect-square ${item.image} relative flex items-center justify-center p-6`}>
               {item.tag && (
                 <Badge className="absolute top-4 left-4 font-bold bg-white text-black hover:bg-white">{item.tag}</Badge>
               )}
               {/* Fallback image */}
               <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white font-bold text-xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                 {item.name.substring(0, 1)}
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{item.name}</h3>
              <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">${item.price.toFixed(2)}</p>
              
              <Button 
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                className="w-full py-6 text-lg rounded-xl shadow-md hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}