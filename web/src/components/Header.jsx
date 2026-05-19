import React from "react";

const Header = ({ connected }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          connected
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {connected ? "� Live" : "� Disconnected"}
      </span>
    </div>
  );
}

export default Header;