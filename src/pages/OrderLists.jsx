import React, { useMemo, useState } from "react";
import Toolbar from "../components/orderLists/Toolbar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const orders = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "2026-09-04",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "2026-05-28",
    type: "Book",
    status: "Processing",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "2026-11-23",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "2026-02-05",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "2026-07-29",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "2026-08-15",
    type: "Medicine",
    status: "Completed",
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "2026-12-21",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00008",
    name: "Rosie Todd",
    address: "New Jon",
    date: "2026-04-30",
    type: "Medicine",
    status: "On Hold",
  },
  {
    id: "00009",
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "2026-01-09",
    type: "Book",
    status: "In Transit",
  },
];

const statusStyles = {
  Completed: "bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-300",
  Processing: "bg-purple-100 text-purple-500 dark:bg-purple-500/20 dark:text-purple-300",
  Rejected: "bg-red-100 text-red-400 dark:bg-red-500/20 dark:text-red-300",
  "On Hold": "bg-orange-100 text-orange-400 dark:bg-orange-500/20 dark:text-orange-300",
  "In Transit": "bg-pink-100 text-pink-400 dark:bg-pink-500/20 dark:text-pink-300",
};

const typeOptions = [
  {
    id: "Health & medicine",
    name: "Health & medicine",
    value: "Health & medicine",
  },
  {
    id: "Book & Stationary",
    name: "Book & Stationary",
    value: "Book & Stationary",
  },
  {
    id: "Services & Industry",
    name: "Services & Industry",
    value: "Services & Industry",
  },
  {
    id: "Fashion & Beauty",
    name: "Fashion & Beauty",
    value: "Fashion & Beauty",
  },
  {
    id: "Home & Living",
    name: "Home & Living",
    value: "Home & Living",
  },
  { id: "Electronics", name: "Electronics", value: "Electronics" },
  { id: "Mobile & Phone", name: "Mobile & Phone", value: "Mobile & Phone" },
  { id: "Accessories", name: "Accessories", value: "Accessories" },
];

const typeMatchMap = {
  "Health & medicine": ["Medicine"],
  "Book & Stationary": ["Book"],
  "Services & Industry": [],
  "Fashion & Beauty": [],
  "Home & Living": [],
  Electronics: ["Electric"],
  "Mobile & Phone": ["Mobile"],
  Accessories: ["Watch"],
};

const statusOptions = [
  { id: "Completed", name: "Completed", value: "Completed" },
  { id: "Processing", name: "Processing", value: "Processing" },
  { id: "Rejected", name: "Rejected", value: "Rejected" },
  { id: "On Hold", name: "On Hold", value: "On Hold" },
  { id: "In Transit", name: "In Transit", value: "In Transit" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OrderLists = () => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [openFilter, setOpenFilter] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = [order.id, order.name, order.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDate =
        dateFilter.length === 0 || dateFilter.includes(order.date);
      const matchesType =
        typeFilter.length === 0 ||
        typeFilter.some((selectedType) => {
          const mappedTypes = typeMatchMap[selectedType];
          if (Array.isArray(mappedTypes) && mappedTypes.length > 0) {
            return mappedTypes.includes(order.type);
          }
          return selectedType === order.type;
        });
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(order.status);

      return matchesSearch && matchesDate && matchesType && matchesStatus;
    });
  }, [search, dateFilter, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedOrders = filteredOrders.slice(pageStart, pageEnd);

  const handleReset = () => {
    setSearch("");
    setDateFilter([]);
    setTypeFilter([]);
    setStatusFilter([]);
    setPage(1);
  };

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] bg-theme-white dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <div className="flex items-center justify-between">
        <h1 className="font-[700] text-[32px] tracking-[-0.2px] text-gray-900 dark:text-slate-100">
          Order Lists
        </h1>
      </div>

      <div className="mt-[26px]">
        <Toolbar
          search={search}
          onSearchChange={(event) => {
            setOpenFilter(null);
            setSearch(event.target.value);
          }}
          dateFilter={dateFilter}
          onDateChange={(value) => {
            setOpenFilter(null);
            setDateFilter(value);
          }}
          typeFilter={typeFilter}
          onTypeChange={(value) => {
            setOpenFilter(null);
            setTypeFilter(value);
          }}
          statusFilter={statusFilter}
          onStatusChange={(value) => {
            setOpenFilter(null);
            setStatusFilter(value);
          }}
          onReset={() => {
            setOpenFilter(null);
            handleReset();
          }}
          typeOptions={typeOptions}
          statusOptions={statusOptions}
          openFilter = {openFilter}
          setOpenFilter = {setOpenFilter}
        />
      </div>

      <div className="mt-6 text-[var(--orderlist-text-color)] bg-white rounded-xl border border-[var(--orderlist-border-color)] overflow-hidden dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
        <div className="grid grid-cols-6 px-6 py-4 text-sm font-[800] border-b border-[var(--orderlist-border-color)] dark:border-slate-700">
          <span className=" uppercase">ID</span>
          <span className=" uppercase">Name</span>
          <span className="uppercase">Address</span>
          <span className=" uppercase">Date</span>
          <span className="  uppercase">Type</span>
          <span className=" uppercase">Status</span>
        </div>

        {pagedOrders.map((order, idx) => (
          <div
            key={order.id}
            className={`grid grid-cols-6 px-6 py-5 items-center ${
              idx !== pagedOrders.length - 1
                ? "border-b border-gray-100 dark:border-slate-800"
                : ""
            } hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors`}
          >
            <span className="text-sm text-gray-700 dark:text-slate-200">
              {order.id}
            </span>
            <span className="text-sm text-gray-700 dark:text-slate-200">
              {order.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-slate-400">
              {order.address}
            </span>
            <span className="text-sm text-gray-700 dark:text-slate-200">
              {formatDate(order.date)}
            </span>
            <span className="text-sm text-gray-700 dark:text-slate-200">
              {order.type}
            </span>
            <div>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-md ${
                  statusStyles[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 ? (
          <div className="px-6 py-10 text-sm text-center text-gray-500 dark:text-slate-400">
            No Data found.
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-sm text-gray-400 dark:text-slate-400">
          Showing {filteredOrders.length === 0 ? 0 : pageStart + 1}-
          {Math.min(pageEnd, filteredOrders.length)} of {filteredOrders.length}
        </span>
        <div className="flex items-center ">
          <button
            type="button"
            className="px-3 py-2 border border-[var(--color-border-primary)] rounded-md border-r-none rounded-r-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            disabled={safePage === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            aria-label="Previous page"
          >
            <FaAngleLeft />
          </button>
          <button
            type="button"
            className="px-3 py-2 border-y-1 border-r-1 border-[var(--color-border-primary)] rounded-y-md rounded-r-lg !rounded-left-none !border-left-none text-[color:var(--color-text-primary)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
            disabled={safePage === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            aria-label="Next page"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLists;
