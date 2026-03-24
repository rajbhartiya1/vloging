import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShopStore {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  cartTotal: () => number;
}

export const useShopStore = create<ShopStore>((set, get) => ({
  cart: [],
  isCartOpen: false,
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        isCartOpen: true
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }], isCartOpen: true };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map((i) => 
      i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
    )
  })),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
