export default function PageHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-[22px] font-bold text-gray-800 dark:text-slate-100">
        UI Elements
      </h1>
      <div className="flex items-center gap-0 rounded-lg border border-gray-200 bg-white text-[13px] shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {/* Reserved for future controls */}
      </div>
    </div>
  );
}
