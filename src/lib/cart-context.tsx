'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  mysteryBoxId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  items: CartItem[];
  orderId: string | null;
  isLoading: boolean;
  addItem: (mysteryBoxId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Initialize cart on client-side
  useEffect(() => {
    const initCart = async () => {
      try {
        // Check for existing cart/order in localStorage
        const storedOrderId = localStorage.getItem('orderId');
        
        if (storedOrderId) {
          try {
            // Try to fetch the existing order
            const response = await fetch(`/api/orders/${storedOrderId}`);
            
            if (response.ok) {
              const order = await response.json();
              setOrderId(order.id);
              
              // Transform order items to CartItems
              const cartItems: CartItem[] = order.items.map((item: any) => ({
                id: item.id,
                mysteryBoxId: item.mysteryBoxId,
                name: item.mysteryBox.name,
                price: parseFloat(item.price.toString()),
                quantity: item.quantity,
                imageUrl: item.mysteryBox.imageUrl || '/placeholder.png',
              }));
              
              setItems(cartItems);
            } else {
              // If order not found or not accessible, create new order
              await createNewOrder();
            }
          } catch (error) {
            console.error("Error fetching cart:", error);
            await createNewOrder();
          }
        } else {
          // No order ID in storage, create new order
          await createNewOrder();
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
        toast.error("Failed to load your cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    initCart();
  }, []);

  const createNewOrder = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newOrder = await response.json();
        setOrderId(newOrder.id);
        localStorage.setItem('orderId', newOrder.id);
        setItems([]);
      } else {
        console.error("Failed to create order:", await response.text());
        // Handle guest cart in localStorage if API fails
        setItems([]);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle guest cart in localStorage if API fails
      setItems([]);
    }
  };

  const addItem = async (mysteryBoxId: string) => {
    if (!orderId) {
      await createNewOrder();
      toast.error("Could not add item. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      // Fetch mystery box details
      const boxResponse = await fetch(`/api/mystery-boxes/${mysteryBoxId}`);
      if (!boxResponse.ok) {
        throw new Error("Failed to fetch mystery box details");
      }
      const mysteryBox = await boxResponse.json();

      // Check if item already exists in cart
      const existingItem = items.find(item => item.mysteryBoxId === mysteryBoxId);
      
      if (existingItem) {
        // If it exists, update quantity instead
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
        return;
      }

      // Add item to order
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mysteryBoxId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const newItem = await response.json();
        
        // Add item to local state
        const cartItem: CartItem = {
          id: newItem.id,
          mysteryBoxId: mysteryBox.id,
          name: mysteryBox.name,
          price: parseFloat(mysteryBox.price.toString()),
          quantity: 1,
          imageUrl: mysteryBox.imageUrl || '/placeholder.png',
        };
        
        setItems([...items, cartItem]);
        toast.success(`${mysteryBox.name} added to cart`);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      // For now, we'll just update locally
      setItems(items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
      
      // API call in a real app:
      // await fetch(`/api/orders/${orderId}/items/${itemId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ quantity }),
      // });
      
      toast.success("Cart updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      // For now, we'll just remove locally
      const itemToRemove = items.find(item => item.id === itemId);
      setItems(items.filter(item => item.id !== itemId));
      
      // API call in a real app:
      // await fetch(`/api/orders/${orderId}/items/${itemId}`, {
      //   method: 'DELETE',
      // });
      
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orderId,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}