import React from "react";
import classNames from "classnames";
import IconComponent from "./IconComponent";
import { FiSearch } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { capitalizeWords } from "../../utils/helpers";

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
      inputDivClassName = "",
      labelClassName = "",
      error = "",
      startIcon,
      endIcon,
      capitalizeWords: shouldCapitalizeWords = false,
      ...rest
    },
    ref,
  ) => {
    const inputRef = React.useRef(null);
    const isPickerInput = type === "date" || type === "time";

    React.useImperativeHandle(ref, () => inputRef.current);

    const handleInputChange = (event) => {
      if (!onChange) return;

      const nextValue = shouldCapitalizeWords
        ? capitalizeWords(event.target.value)
        : event.target.value;

      if (startIcon === "search") {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: nextValue.replace(/^\s+/, ""),
          },
        });
        return;
      }

      if (nextValue !== event.target.value) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: nextValue,
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

    const openPicker = () => {
      if (!isPickerInput || !inputRef.current) {
        return;
      }

      inputRef.current.focus();
      inputRef.current.showPicker?.();
    };

    return (
      <div className={classNames(className, "relative ")}>
        {label && (
          <div className="flex gap-1">
            <label
              htmlFor={id || name}
              className={classNames(
                "mb-1 block capitalize text-sm font-semibold text-[color:var(--color-text-input)]",
                labelClassName,
              )}
            >
              {label}
              {required ? <span className="ml-1 text-red-500">*</span> : null}
            </label>
          </div>
        )}
        <div
          onClick={openPicker}
          className={classNames(
            "relative flex max-h-[48px] items-center gap-2 rounded-[19px] border border-gray-200 bg-white px-3 py-[13px] dark:bg-slate-900 dark:border-slate-700",
            isPickerInput && "cursor-pointer",
            divClassName,
            inputDivClassName,
            error && "!border-red-500 dark:!border-red-500",
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
            ref={inputRef}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onClick={openPicker}
            onFocus={openPicker}
            {...rest}
            className={classNames(
              "w-[420px] bg-transparent text-sm text-[color:var(--color-text-input)] outline-none placeholder:text-sm placeholder:text-[color:var(--color-text-placeholder)] dark:text-slate-100",
              isPickerInput && "cursor-pointer",
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

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);

export default Input;
