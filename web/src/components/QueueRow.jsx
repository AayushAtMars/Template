import React from "react";
import StatusBadge from "./StatusBadge";

const QueueRow = ({ item, index, onAssign, onComplete }) => {
  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="px-5 py-3 text-gray-500 font-medium">#{index + 1}</td>
      <td className="px-5 py-3 font-semibold text-gray-800">{item.name}</td>
      <td className="px-5 py-3">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            item.type === "express"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {item.type}
        </span>
      </td>
      <td className="px-5 py-3 text-gray-600">{item.priority}</td>
      <td className="px-5 py-3">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-5 py-3">
        {item.status === "pending" && (
          <button
            onClick={() => onAssign(item.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition"
          >
            Assign
          </button>
        )}
        {item.status === "assigned" && (
          <button
            onClick={() => onComplete(item.id)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition"
          >
            Complete
          </button>
        )}
        {item.status === "completed" && (
          <span className="text-green-600 font-semibold text-sm">✓ Done</span>
        )}
      </td>
    </tr>
  );
}

export default QueueRow;