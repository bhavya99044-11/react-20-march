export default function Section({ title, children, gridCols = "grid-cols-4" }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 dark:bg-slate-900 dark:border-slate-700">
      <h2 className="mb-4 text-[15px] font-semibold text-gray-800 dark:text-slate-100">
        {title}
      </h2>
      <div className={`grid ${gridCols} items-end gap-6`}>{children}</div>
    </div>
  );
}
