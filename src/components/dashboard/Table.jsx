import React from "react";

const Table = ({ headers = [], data = [], rowKey = "id" }) => {
  if (!headers.length) {
    return null;
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900">
      <div
        className="grid bg-header-gray rounded-xl px-6 pt-4 pb-[13px] text-sm font-bold text-header-black dark:bg-slate-800 dark:text-slate-200"
        style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
      >
        {headers.map((header) => (
          <div
            key={header.key || header.label}
            className={header.headerClassName}
          >
            {header.label}
          </div>
        ))}
      </div>

      {data.map((row, index) => (
        <div
          key={row[rowKey] ?? index}
          className="grid items-center border-b-[0.4px] border-[var(--color-border-dark)]/40 px-6 py-4 text-sm text-header-black/80 font-semibold dark:border-slate-700 dark:text-slate-200/80"
          style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
        >
          {headers.map((header) => (
            <div key={header.key || header.label} className={header.cellClassName}>
              {header.render ? header.render(row) : row[header.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;

