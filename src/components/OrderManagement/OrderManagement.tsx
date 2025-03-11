import React, { useState, useEffect } from "react";
import { Order } from "../../types/Order";
import { sampleOrders } from "../../data/sampleOrders";
import { filterOrdersByStatus, sortOrders } from "../../utils/orderUtils";
import OrderCard from "../OrderCard/OrderCard";
import OrderControls from "../OrderControls/OrderControls";
import "./OrderManagement.css";

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
    result = filterOrdersByStatus(result, statusFilter);

    // Apply sorting
    result = sortOrders(result, sortBy);

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

  return (
    <div className="order-management">
      <h1>Restaurant Order Management</h1>

      {/* Controls */}
      <OrderControls
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Orders list */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              updateOrderStatus={updateOrderStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
