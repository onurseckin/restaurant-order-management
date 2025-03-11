import React from "react";
import { Order } from "../../types/Order";
import { formatDate } from "../../utils/dateUtils";
import "./OrderCard.css";

interface OrderCardProps {
  order: Order;
  updateOrderStatus: (
    orderId: string,
    newStatus: "pending" | "in-progress" | "completed"
  ) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, updateOrderStatus }) => {
  return (
    <div className={`order-card ${order.status}`}>
      <div className="order-header">
        <span className="order-time">{formatDate(order.createdAt)}</span>
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
        <div className="total-price">Total: ${order.totalPrice.toFixed(2)}</div>

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
  );
};

export default OrderCard;
