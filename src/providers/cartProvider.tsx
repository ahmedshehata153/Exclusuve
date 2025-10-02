import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUserCart } from "@/app/services/cartApi";
import { CartResponse } from "@/app/interfaces/cartProvider.interface";
interface CartContext {
  cartDetails: CartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<CartResponse | null>>;
  cartDetailsFun: () => Promise<void>;
}

const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<CartResponse | null>(null);
  async function cartDetailsFun() {
    const data = await getUserCart();
    setCartDetails(data);
  }
  useEffect(() => {
     console.log("MOUNT: CartContextProvider");
    cartDetailsFun();
  }, []);
  return (
    <>
      <CartContext.Provider
        value={{
          cartDetails,
          setCartDetails,
          cartDetailsFun,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("CartProvider must be used within a CartContextProvider");
  }
  return cart;
}
