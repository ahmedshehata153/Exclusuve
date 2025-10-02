import { getUserOrders } from "@/app/services/checkoutApi";
import { ordersResponse } from "@/app/interfaces/allOrders.interface";
import OrdersList from "@/app/component/orders";
export default async function AllOrders() {
  const orders: ordersResponse = await getUserOrders();

  return <OrdersList orders={orders} />;
}
