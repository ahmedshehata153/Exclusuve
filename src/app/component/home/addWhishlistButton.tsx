"use client";

import { Button } from "@/components/ui/button";
import { AddWishList } from "@/app/services/whishListApi";
import { toast } from "sonner";
import { useWish } from "@/providers/wishListProvider";
import { useTransition } from "react";

export default function AddWishListButton({
  Id,
  ...props
}: {
  Id: string;
  [key: string]: string;
}) {
  const { wishDetailsFun, setWishListDetails } = useWish();
  const [isPending, startTransition] = useTransition();
  async function Add(Id: string) {
    startTransition(async()=>{
      const data = await AddWishList(Id);
      if (data.success === true) {
        toast.success("product add successfully", {
          position: "top-center",
        });
        setWishListDetails(data.data);
        wishDetailsFun();
      } else {
        toast.error(data.message, {
          position: "top-center",
        });
      }
    })
  }

  return (
    <>
      <Button
        {...props}
        onClick={() => {
          Add(Id);
        }}
        disabled={isPending}
      >
        Add To Wishlist
      </Button>
    </>
  );
}
