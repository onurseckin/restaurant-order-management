import { Order } from "../types/Order";

export const filterOrdersByStatus = (
  orders: Order[],
  statusFilter: string
): Order[] => {
  if (statusFilter === "all") {
    return orders;
  }
  return orders.filter((order) => order.status === statusFilter);
};

export const sortOrders = (orders: Order[], sortBy: string): Order[] => {
  const sortedOrders = [...orders];

  sortedOrders.sort((a, b) => {
    if (sortBy === "time") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortBy === "price") {
      return b.totalPrice - a.totalPrice;
    } else if (sortBy === "status") {
      const statusOrder = { pending: 0, "in-progress": 1, completed: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  return sortedOrders;
};
