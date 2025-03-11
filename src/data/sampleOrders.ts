import { Order } from "../types/Order";

export const sampleOrders: Order[] = [
  {
    id: "order-001",
    customerName: "John Smith",
    items: [
      { name: "Burger", quantity: 1, price: 12.99 },
      { name: "Fries", quantity: 1, price: 3.99 },
    ],
    totalPrice: 16.98,
    status: "pending",
    createdAt: new Date("2023-05-15T12:30:00"),
  },
  {
    id: "order-002",
    customerName: "Alice Johnson",
    items: [
      { name: "Pizza", quantity: 1, price: 15.99 },
      { name: "Salad", quantity: 1, price: 7.99 },
    ],
    totalPrice: 23.98,
    status: "in-progress",
    createdAt: new Date("2023-05-15T12:15:00"),
  },
  {
    id: "order-003",
    customerName: "Bob Williams",
    items: [
      { name: "Pasta", quantity: 2, price: 13.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    totalPrice: 32.97,
    status: "completed",
    createdAt: new Date("2023-05-15T11:45:00"),
  },
  {
    id: "order-004",
    customerName: "Emily Davis",
    items: [
      { name: "Salmon", quantity: 1, price: 18.99 },
      { name: "Risotto", quantity: 1, price: 14.99 },
      { name: "Wine", quantity: 1, price: 9.99 },
    ],
    totalPrice: 43.97,
    status: "pending",
    createdAt: new Date("2023-05-15T12:45:00"),
  },
];
