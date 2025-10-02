"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkOutForm } from "@/schema/checkout.schema";
import { checkOutSchema } from "@/schema/checkout.schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { checkOutHandling } from "@/app/services/checkoutApi";
import { useActionState } from "react";
import { useEffect } from "react";
import { useCart } from "@/providers/cartProvider";
import { deleteAllCarts } from "@/app/services/cartApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
const formState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    phone: [],
    city: [],
    paymentMethod: [],
  },
  message: null,
};

export default function CheckOutForm() {
  const { cartDetails, setCartDetails } = useCart();
    const form = useForm<checkOutForm>({
      defaultValues: {
        cartId: "",
        details: "",
        phone: "",
        city: "",
        paymentMethod: "cash",
      },
      resolver: zodResolver(checkOutSchema),
    });
  useEffect(() => {
    form.setValue("cartId", cartDetails?.cartId??"");
  }, [cartDetails]);
  const [action, checkAction] = useActionState(checkOutHandling, formState);
  const router = useRouter();
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (form.getValues("paymentMethod") === "cash") {
          toast.success(action.message, {
            position: "top-center",
          });
          (async () => {
            const res = await deleteAllCarts();
            if (res?.message === "success") {
              toast.success("All items deleted successfully");
              setCartDetails(null);
            }
          })();
          timeOut = setTimeout(() => {
            router.push(action.callbackUrl || "all-orders");
          }, 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        });
      }
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [action]);


  return (
    <section className="py-11">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-5xl text-center">Check Out</h2>
        <Form {...form}>
          <form action={checkAction} className="space-y-8">
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Cart Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.cartId?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input placeholder="cairo" {...field} type="text" />
                  </FormControl>
                  <FormMessage>{action?.error?.details?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+20101018180510"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  <FormMessage>{action?.error?.paymentMethod?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
