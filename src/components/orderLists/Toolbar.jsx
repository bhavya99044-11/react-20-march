import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import FilterModal from "./FilterModal";

const Toolbar = ({
  dateFilter,
  onDateChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onReset,
  openFilter,
  setOpenFilter,
  typeOptions = [],
  statusOptions = [],
}) => {
  const [tempDate, setTempDate] = useState(dateFilter);
  const [tempType, setTempType] = useState(typeFilter);
  const [tempStatus, setTempStatus] = useState(statusFilter);

  const open = (key) => {
    setOpenFilter((prev) => {
      if (prev == key) {
        console.log(key);
        return null;
      }
      return key;
    });
    setTempDate(dateFilter);
    setTempType(typeFilter);
    setTempStatus(statusFilter);
  };

  return (
    <div className="flex w-fit items-center bg-white border border-gray-200 rounded-[10px] divide-x-[0.6px] divide-[var(--orderlist-border-color)] h-[70px] dark:bg-slate-900 dark:border-slate-700 dark:divide-slate-700">
      <div className="h-full flex items-center px-6 justify-center">
        <CiFilter size={24} className="font-bold text-[color:var(--orderlist-text-color)] dark:text-slate-200" />
      </div>
      <div className="text-sm text-[color:var(--orderlist-text-color)] h-full cursor-pointer flex items-center justify-center font-bold pl-6 pr-[26px] dark:text-slate-200">
        Filter By
      </div>

      <div className="relative h-full">
        <button
          type="button"
          onClick={() => open("date")}
          className="flex gap-6 pl-6 h-full flex items-center cursor-pointer justify-center pr-[30px]"
        >
          <span
            className={`text-sm text-[color:var(--orderlist-text-color)] font-bold dark:text-slate-200 ${
              openFilter === "date" ? "opacity-50" : ""
            }`}
          >
            Date
          </span>
          <FaAngleDown className={`${openFilter === "date" ? "opacity-50" : ""} dark:text-slate-200`} />
        </button>
        {openFilter === "date" ? (
          <FilterModal
            type="Date"
            value={tempDate}
            onChange={setTempDate}
            onApply={() => {
              onDateChange(tempDate);
            }}
            setOpenFilter={setOpenFilter}
          />
        ) : null}
      </div>

      <div className="relative h-full">
        <button
          type="button"
          onClick={() => open("type")}
          className="flex gap-6 pl-6 pr-[30px] flex items-center h-full cursor-pointer items-center justify-center"
        >
          <span
            className={`text-sm text-[color:var(--orderlist-text-color)] font-bold dark:text-slate-200 ${
              openFilter === "type" ? "opacity-50" : ""
            }`}
          >
            Order Type
          </span>
          <FaAngleDown className={`${openFilter === "type" ? "opacity-50" : ""} dark:text-slate-200`} />
        </button>
        {openFilter === "type" ? (
          <FilterModal
            type="Order Type"
            options={typeOptions}
            value={tempType}
            onChange={setTempType}
            onApply={() => {
              onTypeChange(tempType);
            }}
            setOpenFilter={setOpenFilter}
          />
        ) : null}
      </div>

      <div className="relative h-full">
        <button
          type="button"
          onClick={() => open("status")}
          className="flex gap-6 pl-6 pr-[30px] flex items-center h-full cursor-pointer items-center justify-center"
        >
          <span
            className={`text-sm text-[color:var(--orderlist-text-color)] font-bold dark:text-slate-200 ${
              openFilter === "status" ? "opacity-50" : ""
            }`}
          >
            Order Status
          </span>
          <FaAngleDown
            className={`${openFilter === "status" ? "opacity-50" : ""} dark:text-slate-200`}
          />
        </button>
        {openFilter === "status" ? (
          <FilterModal
            type="Order Status"
            options={statusOptions}
            value={tempStatus}
            onChange={setTempStatus}
            onApply={() => {
              onStatusChange(tempStatus);
            }}
            setOpenFilter={setOpenFilter}
          />
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          setOpenFilter(null);
          onReset();
        }}
        className="flex gap-2 pl-6 pr-[40px] items-center text-[color:var(--color-text-danger)] h-full cursor-pointer dark:text-red-400"
      >
        <RiResetLeftFill />
        <span className="text-sm font-bold">Reset Filter</span>
      </button>
    </div>
  );
};

export default Toolbar;
