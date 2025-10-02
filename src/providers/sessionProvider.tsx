"use client";
import CartContextProvider from "./cartProvider";
import WishListContextProvider from "./wishListProvider";

import { SessionProvider } from "next-auth/react";

export default function Session({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <CartContextProvider>
          <WishListContextProvider>{children}</WishListContextProvider>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
