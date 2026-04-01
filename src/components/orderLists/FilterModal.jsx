import React, { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../common";

const FilterModal = ({
  type,
  options = [],
  value,
  onChange,
  onApply,
  onClose,
  setOpenFilter,
  className = "",
}) => {
  const containerRef = useRef(null);
  const formatDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDates = Array.isArray(value)
    ? value
        .map((item) => new Date(item))
        .filter((item) => !Number.isNaN(item.getTime()))
    : [];
  const selectedTypes = Array.isArray(value) ? value : [];
  const isOrderType = type === "Order Type";
  const isOrderStatus = type === "Order Status";
  const isDate = type === "Date";

  useEffect(() => {
    const handleOutside = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (isOrderType || isOrderStatus || isDate) {
    const title = isOrderType
      ? "Select Order Type"
      : isOrderStatus
        ? "Select Order Status"
        : "Select Date";
    const helper = isOrderType
      ? "*You can choose multiple Order type"
      : isOrderStatus
        ? "*You can choose multiple Order status"
        : "*You can choose multiple date";
    const containerWidth = isDate ? "w-[387px]" : "w-[523px]";
    return (
      <div
        ref={containerRef}
        className={`popup-animate absolute -left-[15px] top-[50px] z-40 mt-2 ${containerWidth} rounded-[26px] border border-[var(--color-border-soft)]/36 bg-white shadow-xl dark:bg-slate-900 dark:border-slate-700`}
      >
        <div>
          {isDate ? null : (
            <div className="flex items-center justify-between px-6 pt-4 pb-[23px]">
              <h2 className="text-lg font-bold dark:text-slate-100">{title}</h2>
            </div>
          )}
          <div className="flex justify-center pb-6 border-b border-[var(--orderlist-border-color)]/50 dark:border-slate-700">
            {isDate ? (
              <div className="">
                <DayPicker
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => {
                    if (!dates || dates.length === 0) {
                      onChange([]);
                      return;
                    }
                    onChange(dates.map((date) => formatDateValue(date)));
                  }}
                  formatters ={{
                      formatWeekdayName: (day) => day?.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
                    }
                  }
                />
              </div>
            ) : (
              <div className=" grid grid-cols-3 gap-x-3 gap-y-4">
                {options.map((option) => {
                  const isSelected = selectedTypes.includes(option.value);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onChange(
                            selectedTypes.filter(
                              (item) => item !== option.value,
                            ),
                          );
                          return;
                        }
                        onChange([...selectedTypes, option.value]);
                      }}
                    className={`px-[10px] py-2 rounded-full border text-sm font-semibold cursor-pointer transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 border-[0.6px] text-white"
                        : "border-[var(--orderlist-border-color)] border-[0.6px] dark:border-slate-700 dark:text-slate-200"
                    }`}
                  >
                      {option.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400 pt-4 px-6 dark:text-slate-400">{helper}</p>
        <div className="flex justify-center mt-8">
          <Button
            className="bg-blue-500 w-[129px] mb-[26px] text-white text-sm font-medium flex items-center justify-center py-[9px] rounded-lg"
            text="Apply Now"
            onClick={onApply}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`popup-animate absolute left-0 top-full z-40 mt-2 w-[387px] rounded-[26px] border border-[var(--color-border-soft)]/36 bg-white shadow-lg dark:bg-slate-900 dark:border-slate-700 ${className}`}
    >
      <div className="">
        <div className="">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-[color:var(--orderlist-text-color)] dark:text-slate-200"
            >
              <input
                type="radio"
                name={type}
                value={option.value}
                checked={value === option.value}
                onChange={(event) => onChange(event.target.value)}
                className="h-4 w-4 accent-blue-500"
              />
              {option.name}
            </label>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--color-border-dark)] px-6 py-4 dark:border-slate-700">
        <Button
          className="bg-secondary w-fit mx-auto text-white font-bold text-xs py-[9px] px-[33px]"
          text="Apply Now"
          onClick={onApply}
        />
      </div>
    </div>
  );
};

export default FilterModal;
