"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ordersResponse } from "@/app/interfaces/allOrders.interface"; // ده الملف اللي فيه الـ types
import Image from "next/image";



export default function OrdersList({ orders }: { orders: ordersResponse }) {
  return (
    <div className="grid gap-6 py-6">
      {orders?.map((order) => (
        <Card key={order?._id} className="shadow-md rounded-2xl">
          <CardHeader className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {new Date(order?.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant={order?.isPaid ? "default" : "secondary"}>
                {order?.isPaid ? "Paid" : "Unpaid"}
              </Badge>
              <Badge variant={order.isDelivered ? "default" : "destructive"}>
                {order?.isDelivered ? "Delivered" : "Pending"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* 🛒 Cart Items */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="flex items-center gap-2 p-2">
                        <Image
                          src={item?.product?.imageCover}
                          alt={item?.product?.title}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <span className="font-medium">
                          {item?.product?.title}
                        </span>
                      </td>
                      <td className="p-2">{item?.count}</td>
                      <td className="p-2">${item?.price}</td>
                      <td className="p-2">${item?.count * item?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 💰 Order Summary */}
            <div className="flex justify-end text-sm">
              <div className="space-y-1 text-right">
                <p>Tax: ${order?.taxPrice}</p>
                <p>Shipping: ${order?.shippingPrice}</p>
                <p className="font-semibold text-lg">
                  Total: ${order?.totalOrderPrice}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
