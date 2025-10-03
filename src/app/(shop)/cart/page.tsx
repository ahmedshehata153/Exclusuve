"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/providers/cartProvider";
import { deleteAllCarts } from "@/app/services/cartApi";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { deleteCart } from "@/app/services/cartApi";
import { changeQuan } from "@/app/services/cartApi";
import { useTransition } from "react";

export default function Cart() {
  const { cartDetails, setCartDetails } = useCart();
  const [isPending, startTransition] = useTransition();

  async function deleteCarts() {
    startTransition(async () => {
      const res = await deleteAllCarts();
      if (res?.message === "success") {
        toast.success("All items deleted successfully");
        setCartDetails(null);
      } else {
        toast.error(res?.message || "something is wrong");
      }
    });
  }

  async function removeCart(Id: string) {
    startTransition(async () => {
      const res = await deleteCart(Id);
      if (res.status === "success") {
        toast.success("item removed successfully");
        setCartDetails(res);
      } else {
        toast.error("something wrong");
      }
    });
  }
  async function changeQuantity(productId: string, count: number) {
    startTransition(async () => {
      const res = await changeQuan(productId, count);
      if (res?.status === "success") {
        setCartDetails(res);
        toast.success("item uploaded successfully");
      } else {
        toast.error("something wrong");
      }
    });
  }

  return (
    <>
      {cartDetails && cartDetails?.data?.products?.length > 0 ? (
        <section className="py-[130px] min-h-screen">
          <div className="container px-2 md:px-0 mx-auto">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails?.data?.products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex gap-3 flex-col sm:flex-row relative">
                          <button
                            onClick={() => {
                              removeCart(product.product._id);
                            }}
                            disabled={isPending}
                          >
                            <Badge
                              variant="destructive"
                              className="absolute start-0 top-0"
                            >
                              <X />
                            </Badge>
                            <Image
                              alt={product?.product?.title}
                              src={product?.product?.imageCover}
                              width={50}
                              height={39}
                              unoptimized
                            />
                          </button>
                          <h2 className="sm:self-center">
                            {product?.product?.title
                              ?.split("")
                              .slice(1, 20)
                              .join("")}
                          </h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <h2>LE</h2>
                          <h2>{product?.price}</h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex px-2 gap-3.5">
                          <h2 className="self-center">{product?.count}</h2>
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                changeQuantity(
                                  product.product._id,
                                  product.count + 1
                                );
                              }}
                              disabled={isPending}
                            >
                              <ChevronUp className="w-[16px]" />
                            </button>
                            <button
                              onClick={() => {
                                changeQuantity(
                                  product.product._id,
                                  product.count - 1
                                );
                              }}
                              disabled={isPending}
                            >
                              <ChevronDown className="w-[16px]" />
                            </button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span>LE</span>
                        <span className="ms-0.5 inline-block">{product.price * product.count}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between m-4">
                <Button variant="outline" asChild>
                  <Link href="/">Return To Shop</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={deleteCarts}
                  disabled={isPending}
                >
                  Remove All Items
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 md:flex-row md:justify-between mt-24">
              <div className="md:w-5/12 flex gap-x-2">
                <Input />
                <Button variant="destructive">Apply Coupon</Button>
              </div>
              <div className="border-2 border-black p-3.5 w-full md:w-1/3">
                <h2 className="text-[20px] font-[500] pb-3">Cart Total</h2>
                <ul className="divide-gray-400 divide-y pb-3">
                  <li className="flex justify-between pb-3">
                    <span>Subtotal:</span>
                    <span>{cartDetails?.data?.totalCartPrice} LE</span>
                  </li>
                  <li className="flex justify-between pb-3 pt-3">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </li>
                  <li className="flex justify-between pb-3 pt-3">
                    <span>Total:</span>
                    <span>{cartDetails?.data?.totalCartPrice} LE</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button variant="destructive" asChild>
                    <Link href="/checkout">Proceed to checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="flex justify-center flex-col gap-3 min-h-screen items-center">
            <p className="capitalize">there is not item</p>
            <Button variant="outline" asChild>
              <Link href="/">Return To Shop</Link>
            </Button>
          </div>
        </>
      )}
    </>
  );
}
