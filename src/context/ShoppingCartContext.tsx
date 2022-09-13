import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContext {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantiry: (id: number) => void;
  decreaseCartQuantiry: (id: number) => void;
  removeCartQuantiry: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const getItemQuantity = (id: number): number => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantiry = (id: number): void => {
    setCartItems((prevCartState) => {
      if (prevCartState.find((item) => item.id === id) == null) {
        return [...prevCartState, { id, quantity: 1 }];
      }
      return prevCartState.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });
    });
  };

  const decreaseCartQuantiry = (id: number): void => {
    setCartItems((prevCartState) => {
      if (prevCartState.find((item) => item.id === id)?.quantity === 1) {
        return prevCartState.filter((item) => item.id !== id);
      }

      return prevCartState.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
    });
  };

  const removeCartQuantiry = (id: number): void => {
    setCartItems((prevCartState) => {
      return prevCartState.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (quantiry, item) => quantiry + item.quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantiry,
        decreaseCartQuantiry,
        removeCartQuantiry,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
