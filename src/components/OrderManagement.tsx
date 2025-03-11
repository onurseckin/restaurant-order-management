import React, { useState, useEffect } from "react";
import "./OrderManagement.css";

// Define types
interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

// Sample data (normally would come from API)
const sampleOrders: Order[] = [
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

// Main component
const OrderManagement: React.FC = () => {
  // State management
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("time");

  // Initialize data
  useEffect(() => {
    // In a real app, this would be an API call
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
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

    setFilteredOrders(result);
  }, [orders, statusFilter, sortBy]);

  // Update order status
  const updateOrderStatus = (
    orderId: string,
    newStatus: "pending" | "in-progress" | "completed"
  ) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="order-management">
      <h1>Restaurant Order Management</h1>

      {/* Controls */}
      <div className="controls">
        <div className="filter">
          <label>Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="sort">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="time">Time</option>
            <option value="price">Price</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Orders list */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className={`order-card ${order.status}`}>
              <div className="order-header">
                <span className="order-time">
                  {formatDate(order.createdAt)}
                </span>
                <span className="order-id">{order.id}</span>
                <span className={`order-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <h3 className="customer-name">{order.customerName}</h3>

              <ul className="items-list">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="order-footer">
                <div className="total-price">
                  Total: ${order.totalPrice.toFixed(2)}
                </div>

                <div className="order-actions">
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "in-progress")}
                      className="action-button start"
                    >
                      Start Order
                    </button>
                  )}

                  {order.status === "in-progress" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "completed")}
                      className="action-button complete"
                    >
                      Complete Order
                    </button>
                  )}

                  {order.status === "completed" && (
                    <span className="completed-label">✓ Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
