import React from "react";

export const salesDetailsData = [
  // { name: "5k", value: 20 },
  // { name: "7k", value: 30 },
  // { name: "10k", value: 48 },
  // { name: "12k", value: 38 },
  // { name: "13k", value: 45 },
  // { name: "15k", value: 32 },
  // { name: "17k", value: 40 },
  // { name: "18k", value: 48 },
  // { name: "20k", value: 95 },
  // { name: "22k", value: 42 },
  // { name: "25k", value: 50 },
  // { name: "27k", value: 38 },
  // { name: "30k", value: 44 },
  // { name: "32k", value: 60 },
  // { name: "35k", value: 25 },
  // { name: "37k", value: 30 },
  // { name: "40k", value: 45 },
  // { name: "42k", value: 46 },
  // { name: "43k", value: 42 },
  // { name: "45k", value: 70 },
  // { name: "47k", value: 58 },
  // { name: "48k", value: 65 },
  // { name: "50k", value: 62 },
  // { name: "52k", value: 55 },
  // { name: "53k", value: 60 },
  // { name: "55k", value: 52 },
  // { name: "57k", value: 58 },
  // { name: "58k", value: 45 },
  // { name: "60k", value: 50 },
];

const SALES_DETAILS_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

export const getSalesDetailsData = (monthName) => {
  const monthIndex = SALES_DETAILS_MONTHS.indexOf(monthName);
  if (monthIndex === -1) return salesDetailsData;

  const monthShift = (monthIndex % 6) - 3;
  return salesDetailsData.map((point, index) => {
    const variation = ((index % 5) - 2) * 1.5;
    const nextValue = clampValue(point.value + monthShift * 3 + variation, 20, 100);
    return { ...point, value: Math.round(nextValue) };
  });
};

export const revenueData = [
  { name: "5k", sales: 30, profit: 40 },
  { name: "10k", sales: 25, profit: 65 },
  { name: "15k", sales: 35, profit: 45 },
  { name: "20k", sales: 30, profit: 30 },
  { name: "25k", sales: 45, profit: 50 },
  { name: "30k", sales: 50, profit: 40 },
  { name: "35k", sales: 80, profit: 55 },
  { name: "40k", sales: 60, profit: 55 },
  { name: "45k", sales: 40, profit: 45 },
  { name: "50k", sales: 62, profit: 35 },
  { name: "55k", sales: 55, profit: 30 },
  { name: "60k", sales: 45, profit: 75 },
];

export const analyticsData = [
  { year: "2015", a: 25, b: 20 },
  { year: "2016", a: 60, b: 55 },
  { year: "2017", a: 50, b: 45 },
  { year: "2018", a: 40, b: 30 },
  { year: "2019", a: 55, b: 45 },
  { year: "2020", a: 70, b: 60 },
  { year: "2021", a: 80, b: 70 },
  { year: "2026", a: 100, b: 92 },
];

export const featuredProducts = [
  { name: "Beats Headphone 2026", price: "$89.00", image: "/images/watch.jpeg" },
  { name: "Apple Watch Series 4", price: "$120.00", image: "/images/watch.jpeg" },
];

export const tableHeaders = [
  {
    label: "Product Name",
    key: "product",
    render: (row) => (
      <div className="flex items-center gap-4">
        <img
          src={row.image}
          alt={row.product}
          className="w-10 h-10 rounded-md object-cover"
        />
        <span className="font-semibold text-header-black/80">
          {row.product}
        </span>
      </div>
    ),
  },
  { label: "Location", key: "location" },
  { label: "Date - Time", key: "dateTime" },
  { label: "Piece", key: "piece" },
  { label: "Amount", key: "amount" },
  {
    label: "Status",
    key: "status",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (row) => (
      <span
        className={`text-white text-xs  px-4 py-1 rounded-full ${row.statusClassName}`}
      >
        {row.status}
      </span>
    ),
  },
];
