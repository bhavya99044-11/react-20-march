import React from "react";

const Rating = ({ value = 0, count = 0 }) => {
  const fullStars = Math.max(0, Math.min(5, Math.floor(value)));
  const stars = Array.from({ length: 5 }, (_, index) => index < fullStars);

  return (
    <div className="flex items-center gap-[1px] text-[color:var(--color-text-warning)]">
      {stars.map((filled, index) => (
        <span key={index} className={filled ? "" : "text-gray-300 text-[16px] dark:text-slate-600"}>
          ★
        </span>
      ))}
      <span className="text-gray-400 ml-1 dark:text-slate-400">({count})</span>
    </div>
  );
};

export default Rating;

