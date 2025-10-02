import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getUserWishList } from "@/app/services/whishListApi";
import { WishResponse } from "@/app/interfaces/wishListProvider";
interface WishContext {
  wishListDetails: WishResponse | null;
  setWishListDetails: React.Dispatch<React.SetStateAction<WishResponse | null>>;
  wishDetailsFun: () => Promise<void>;
}

const wishListContext = createContext<WishContext | null>(null);

export default function WishListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishListDetails, setWishListDetails] = useState<WishResponse | null>(
    null
  );
  async function wishDetailsFun() {
    const data = await getUserWishList();
    setWishListDetails(data);
  }
  useEffect(() => {
  
    wishDetailsFun();
    
  }, []);
  return (
    <>
      <wishListContext.Provider
        value={{
          wishListDetails,
          setWishListDetails,
          wishDetailsFun,
        }}
      >
        {children}
      </wishListContext.Provider>
    </>
  );
}

export function useWish() {
  const wish = useContext(wishListContext);
  if (!wish) {
    throw new Error("CartProvider must be used within a CartContextProvider");
  }
  return wish;
}
