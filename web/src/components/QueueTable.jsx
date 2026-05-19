import React from "react";
import QueueRow from "./QueueRow";

const QueueTable = ({ queue, onAssign, onComplete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            {["#", "Name", "Type", "Priority", "Status", "Action"].map((h) => (
              <th key={h} className="text-left px-5 py-3 text-sm font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {queue.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-16 text-gray-400">
                Queue is empty
              </td>
            </tr>
          ) : (
            queue.map((item, index) => (
              <QueueRow
                key={item.id}
                item={item}
                index={index}
                onAssign={onAssign}
                onComplete={onComplete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default QueueTable