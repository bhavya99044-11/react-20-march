import React from "react";
import classNames from "classnames";

const placements = {
  top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
  bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
  left: "right-full top-1/2 -translate-y-1/2 -translate-x-2",
  right: "left-full top-1/2 -translate-y-1/2 translate-x-2",
};

const Tooltip = ({
  content,
  children,
  placement = "bottom",
  className = "",
  contentClassName = "",
}) => {
  if (!content) {
    return children;
  }

  return (
    <span className={classNames("relative z-60 inline-flex group", className)}>
      {children}
      <span
        role="tooltip"
        className={classNames(
          "pointer-events-none absolute z-50  whitespace-pre-line break-words rounded-md bg-gray-900 px-2 py-1 text-center text-xs leading-4 text-white opacity-0 shadow-sm transition-all duration-150 scale-95",
          "group-hover:opacity-100 group-hover:scale-100",
          "group-focus-within:opacity-100 group-focus-within:scale-100",
          placements[placement] || placements.top,
          contentClassName,
        )}
      >
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
