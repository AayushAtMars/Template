import React from "react";

const styles = {
  pending:   "bg-yellow-100 text-yellow-700",
  assigned:  "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

export default StatusBadge