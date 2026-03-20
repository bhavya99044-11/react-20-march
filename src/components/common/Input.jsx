import React from "react";
import classNames from "classnames";
import IconComponent from "./IconComponent";
import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

const Input = React.forwardRef(
  (
    {
      id,
      name,
      type = "text",
      label,
      placeholder,
      value,
      onChange,
      required = false,
      className = "",
      inputClassName = "",
      divClassName = "",
      labelClassName = "",
      error = "",
      startIcon,
      endIcon,
    },
    ref,
  ) => {
    const handleInputChange = (event) => {
      if (!onChange) return;

      if (startIcon === "search") {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: event.target.value.replace(/^\s+/, ""),
          },
        });
        return;
      }

      onChange(event);
    };

    const handleClear = () => {
      if (onChange) {
        onChange({ target: { value: "" } });
      }
    };
    return (
      <div className={classNames(className, "relative ")}>
        {label && (
          <div className="flex gap-1">
            <label
              htmlFor={name}
              className={classNames(
                "mb-1 block  capitalize text-sm font-semibold text-[color:var(--color-text-input)]",
                labelClassName,
              )}
            >
              {label}
            </label>
            {required ? <span className="text-red-500">*</span> : ""}
          </div>
        )}
        <div className="relative overflow-hidden border border-gray-200 rounded-[19px]">
          <div
            className={classNames(
              "relative z-10 flex items-center m-[1px] max-h-[48px] gap-2 rounded-[19px] border bg-white px-3 py-[13px] dark:bg-slate-900 dark:border-slate-700",
              error ? "border-red-500" : "border-transparent",
              divClassName,
            )}
          >
            {startIcon ? (
              <span className="shrink-0 h-4 w-4 text-[color:var(--color-text-placeholder)] dark:text-slate-400">
                {startIcon === "search" ? (
                  <FiSearch className="h-4 w-4" />
                ) : (
                  <IconComponent icon={startIcon} />
                )}
              </span>
            ) : null}
            <input
              id={id}
              ref={ref}
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              required={required}
              className={classNames(
                "w-[420px] bg-transparent text-sm text-[color:var(--color-text-input)] outline-none placeholder:text-sm placeholder:text-[color:var(--color-text-placeholder)] dark:text-slate-100",
                inputClassName,
              )}
            />
            {endIcon ? (
              <span className="pt-[2px]">{endIcon}</span>
            ) : ((startIcon == "search") && value &&
              <span
                onClick={handleClear}
                className="cursor-pointer text-[color:var(--color-text-placeholder)] dark:text-slate-400"
              >
                <RiCloseLine className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

export default Input;
