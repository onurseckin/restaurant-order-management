export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}
