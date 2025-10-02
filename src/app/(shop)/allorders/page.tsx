import { getUserOrders } from "@/app/services/checkoutApi";
import { ordersResponse } from "@/app/interfaces/allOrders.interface";
import OrdersList from "@/app/component/orders";
export default async function allorders() {
  const orders: ordersResponse = await getUserOrders();

  return 
  <div className="min-h-screen">
    <OrdersList orders={orders} />
  </div>;
}
