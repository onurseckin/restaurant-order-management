import React from "react";
import "./OrderControls.css";

interface OrderControlsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const OrderControls: React.FC<OrderControlsProps> = ({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) => {
  return (
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
  );
};

export default OrderControls;
