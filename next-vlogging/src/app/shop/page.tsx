"use client";

import { useShopStore } from "@/store/shopStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Copy, CheckCircle2, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const MERCH_ITEMS = [
  { id: "m1", name: "VlogHub Classic Hoodie", price: 45.99, image: "bg-indigo-900", tag: "Best Seller", category: "Apparel", desc: "Stay warm and look cool with our premium 100% cotton hoodie. Features double-stitched seams and a front pouch pocket." },
  { id: "m2", name: "Creator Cap", price: 24.99, image: "bg-zinc-800", tag: "New", category: "Apparel", desc: "Classic dad hat with an adjustable strap. Minimalist embroidered logo." },
  { id: "m3", name: "\"Like & Subscribe\" Mug", price: 15.99, image: "bg-orange-800", category: "Accessories", desc: "Start your day right with this solid ceramic mug. Microwave and dishwasher safe." },
  { id: "m4", name: "Travel Planner Journal", price: 20.00, image: "bg-emerald-900", category: "Accessories", desc: "Plan your next vlogging adventure with this beautiful dot-grid notebook." },
  { id: "m5", name: "Neon Desk Mat", price: 35.50, image: "bg-purple-900", tag: "Limited", category: "Accessories", desc: "Extra-large desk mat for your editing station. Smooth glide surface with anti-slip base." },
  { id: "m6", name: "VlogHub Stickers Pack", price: 9.99, image: "bg-pink-900", category: "Digital", desc: "A pack of 10 high-quality vinyl stickers. Perfect for laptops, cases, and more! Includes digital wallpapers." },
];

const CATEGORIES = ["All", "Apparel", "Accessories", "Digital"];

export default function ShopPage() {
  const { addToCart, toggleCart, cart, isCartOpen } = useShopStore();
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof MERCH_ITEMS[0] | null>(null);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredItems = MERCH_ITEMS.filter(item => filter === "All" || item.category === filter);

  return (
    <div className="space-y-12 pb-12">
      <CartDrawer />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
            >
              <div className={`w-full md:w-1/2 aspect-square md:aspect-auto ${selectedProduct.image} relative flex items-center justify-center p-8`}>
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white font-bold text-4xl shadow-2xl">
                  {selectedProduct.name.substring(0, 1)}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    {selectedProduct.tag && (
                      <Badge className="bg-indigo-600 mb-3">{selectedProduct.tag}</Badge>
                    )}
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">{selectedProduct.name}</h2>
                    <p className="text-gray-500 mt-2 text-lg font-medium">{selectedProduct.category}</p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
                <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  {selectedProduct.desc}
                </p>
                <div className="mt-auto pt-4 space-y-6">
                  {(selectedProduct.category === "Apparel") && (
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">SELECT SIZE</p>
                      <div className="flex gap-3">
                        {["S", "M", "L", "XL"].map(size => (
                          <button key={size} className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-zinc-700 hover:border-indigo-600 dark:focus:ring-2 focus:ring-indigo-500 dark:hover:border-indigo-400 flex items-center justify-center text-lg font-bold transition-all hover:scale-105 active:scale-95">
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={() => {
                       addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, image: selectedProduct.image });
                       setSelectedProduct(null);
                       if (!isCartOpen) toggleCart();
                    }}
                    className="w-full py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all shadow-sm border ${
              filter === cat 
                ? "bg-gray-900 text-white border-transparent dark:bg-white dark:text-black" 
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-400 dark:hover:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none dark:border dark:border-zinc-800 transition-all duration-300 flex flex-col h-full">
            <div 
              className={`w-full aspect-square ${item.image} relative flex items-center justify-center p-6 cursor-pointer`}
              onClick={() => setSelectedProduct(item)}
            >
              {item.tag && (
                <Badge className="absolute top-4 left-4 font-bold bg-white text-black hover:bg-white z-10">{item.tag}</Badge>
              )}
              {/* Fallback image */}
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md text-white font-bold text-xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                {item.name.substring(0, 1)}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{item.name}</h3>
              <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">${item.price.toFixed(2)}</p>
              
              <div className="mt-auto flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProduct(item)}
                  className="flex-1 py-6 rounded-xl font-bold border-2"
                >
                  Quick View
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
                  }}
                  className="flex-none p-6 rounded-xl shadow-md hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
                >
                  <ShoppingCart size={20} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
