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
import { useWish } from "@/providers/wishListProvider";
import { Button } from "@/components/ui/button";
import { deleteWishList } from "@/app/services/whishListApi";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
export default function WishList() {
  const { wishListDetails, wishDetailsFun } = useWish();
  async function removewish(Id: string) {
    const res = await deleteWishList(Id);
    if (res.status === "success") {
      toast.success("item removed successfully");
      wishDetailsFun();
    } else {
      toast.error("something wrong");
    }
  }
  return (
    <>
      {wishListDetails && wishListDetails.data.length > 0 ? (
        <>
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
                    {wishListDetails?.data?.map((product) => {
                      return (
                        <TableRow key={product._id}>
                          <TableCell className="font-medium">
                            <div className="flex gap-3 flex-col sm:flex-row relative">
                              <Badge
                                variant="destructive"
                                className="absolute start-0 top-0"
                                onClick={() => {
                                  removewish(product._id);
                                }}
                              >
                                <X />
                              </Badge>
                              <Image
                                alt={product.title}
                                src={product.imageCover}
                                width={50}
                                height={39}
                                unoptimized
                              />
                              <h2 className="sm:self-center">
                                {product?.title
                                  ?.split("")
                                  .slice(0, 20)
                                  .join("")}
                              </h2>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <h2>LE</h2>
                              <h2>{product.price}</h2>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex px-2 gap-3.5">
                              <h2 className="self-center">
                                {product.quantity}
                              </h2>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <span>LE</span>
                            <span className="ms-0.5">
                              {product.quantity * product.price}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center m-4">
                <Button variant="outline" asChild>
                  <Link href="/">Return To Shop</Link>
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="flex justify-center flex-col gap-3 min-h-screen items-center">
          <p className="capitalize">there is not item</p>
          <Button variant="outline" asChild>
            <Link href="/">Return To Shop</Link>
          </Button>
        </div>
      )}
    </>
  );
}
