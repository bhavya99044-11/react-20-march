import React from "react";
import classNames from "classnames";

const Checkbox = ({
  id,
  name,
  wrapClassName = "",
  checkLabel,
  labelClassName = "",
  inputClassName = "",
  checked,
  onChange,
  color,
  size = 20,
}) => {
  const checkboxId = id || `checkbox-${checkLabel?.toLowerCase()?.replace(/\s+/g, "-") || "field"}`;
  const checkboxStyle = color
    ? {
        "--checkbox-color": color,
        borderColor: color,
        accentColor: color,
        width: `${size}px`,
        height: `${size}px`,
      }
    : {
        width: `${size}px`,
        height: `${size}px`,
      };

  return (
    <div className={classNames("flex items-center gap-2", wrapClassName)}>
      <span
        className="relative"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={checkboxStyle}
          className={classNames(
            "peer appearance-none cursor-pointer h-5 w-5 border-2 border-gray-300 checked:bg-black rounded-sm checked:border-transparent focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:focus:ring-blue-500/60",
            color &&
              "checked:!bg-[var(--checkbox-color)] checked:!border-[var(--checkbox-color)] focus:!ring-[var(--checkbox-color)]/30",
            inputClassName,
          )}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 text-white opacity-0 mt-[1px] transition-opacity duration-200 peer-checked:opacity-100"
          style={{
            width: `${Math.max(size - 5, 10)}px`,
            height: `${Math.max(size - 5, 10)}px`,
            transform: "translate(-50%, -50%)",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>

      <label htmlFor={checkboxId} className={classNames("text-[14px]", labelClassName)}>
        {checkLabel}
      </label>
    </div>
  );
};

export default Checkbox;
