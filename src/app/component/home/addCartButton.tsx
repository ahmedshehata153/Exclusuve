"use client";

import { Button } from "@/components/ui/button";
import { AddCart } from "@/app/services/cartApi";
import { toast } from "sonner";
import { useCart } from "@/providers/cartProvider";
import {  useTransition } from "react";

export default function AddCartButton({
  Id,
  ...props
}: {
  Id: string;
  [key: string]: string;
}) {
  const { cartDetailsFun, setCartDetails } = useCart();
  const [isPending,startTransition] = useTransition();
  async function Add(Id: string) {

    startTransition(async() => {
          const data = await AddCart(Id);
      if (data?.success === true) {
        toast.success("product add successfully", {
          position: "top-center",
        });
        setCartDetails(data.data);
        cartDetailsFun();
      } else {
        toast.error(data.message, {
          position: "top-center",
        });
      }
    });
  }

  return (
    <>
      <Button
        disabled={isPending}
        {...props}
        onClick={() => {
          Add(Id);
        }}
      >
        Add To Cart
      </Button>
    </>
  );
}
