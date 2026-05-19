import React from "react";

const StatsRow = ({ queue }) => {
  const stats = [
    {
      label: "Pending",
      count: queue.filter((i) => i.status === "pending").length,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      label: "Assigned",
      count: queue.filter((i) => i.status === "assigned").length,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Completed",
      count: queue.filter((i) => i.status === "completed").length,
      bg: "bg-green-50",
      text: "text-green-700",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} rounded-xl p-5 text-center shadow-sm`}
        >
          <p className={`text-4xl font-bold ${s.text}`}>{s.count}</p>
          <p className="text-sm text-gray-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsRow