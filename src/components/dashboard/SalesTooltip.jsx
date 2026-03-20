import React from "react";

const SalesTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md shadow font-semibold">
        {payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>
    );
  }
  return null;
};

export default SalesTooltip;
