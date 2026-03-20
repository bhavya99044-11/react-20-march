import React from "react";
import Card from "@/components/dashboard/Card";

const DashboardStats = ({ cards, loading }) => {
  return (
    <div className="mt-[27px]  grid grid-cols-4 gap-[22px]">
      {cards.map((card) => (
        <Card key={card.heading} loading={loading} {...card} />
      ))}
    </div>
  );
};

export default DashboardStats;
