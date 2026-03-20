const SalesDetailsSkeleton = () => {
  return (
    <div className="h-[220px] w-full overflow-hidden rounded-xl border border-[var(--color-border-light)]/60 bg-header-gray/40 dark:border-slate-800 dark:bg-slate-900/60">
      <svg
        className="h-full w-full animate-pulse"
        viewBox="0 0 600 220"
        preserveAspectRatio="none"
      >
        <g stroke="var(--chart-grid)" strokeWidth="1">
          <line x1="0" y1="40" x2="600" y2="40" />
          <line x1="0" y1="80" x2="600" y2="80" />
          <line x1="0" y1="120" x2="600" y2="120" />
          <line x1="0" y1="160" x2="600" y2="160" />
          <line x1="0" y1="200" x2="600" y2="200" />
        </g>
        <path
          d="M0 165 C 60 120, 120 190, 180 150 C 240 110, 300 170, 360 135 C 420 95, 480 165, 540 120 C 570 105, 590 115, 600 110 L 600 220 L 0 220 Z"
          fill="#D3D3D3"
        />
        <path
          d="M0 165 C 60 120, 120 190, 180 150 C 240 110, 300 170, 360 135 C 420 95, 480 165, 540 120 C 570 105, 590 115, 600 110"
          fill="none"
          stroke="#ADADAD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#D3D3D3" opacity="0.5">
          <circle cx="60" cy="120" r="3" />
          <circle cx="180" cy="150" r="3" />
          <circle cx="300" cy="170" r="3" />
          <circle cx="420" cy="95" r="3" />
          <circle cx="540" cy="120" r="3" />
        </g>
      </svg>
    </div>
  );
};

export default SalesDetailsSkeleton;