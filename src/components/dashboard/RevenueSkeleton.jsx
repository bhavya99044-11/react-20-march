const RevenueSkeleton = () => {
  return (
    <div className="h-[328px] w-full overflow-hidden rounded-xl border border-[var(--color-border-light)]/60 bg-header-gray/40 dark:border-slate-800 dark:bg-slate-900/60">
      <svg
        className="h-full w-full animate-pulse"
        viewBox="0 0 600 328"
        preserveAspectRatio="none"
      >
        <g fill="#D3D3D3">
          <rect x="10" y="40" width="10" height="10" rx="2" />
          <rect x="10" y="92" width="10" height="10" rx="2" />
          <rect x="10" y="144" width="10" height="10" rx="2" />
          <rect x="10" y="196" width="10" height="10" rx="2" />
          <rect x="10" y="248" width="10" height="10" rx="2" />
          <rect x="10" y="300" width="10" height="10" rx="2" />
        </g>
        <g stroke="var(--chart-grid)" strokeWidth="1">
          <line x1="50" y1="52" x2="600" y2="52" />
          <line x1="50" y1="104" x2="600" y2="104" />
          <line x1="50" y1="156" x2="600" y2="156" />
          <line x1="50" y1="208" x2="600" y2="208" />
          <line x1="50" y1="260" x2="600" y2="260" />
          <line x1="50" y1="312" x2="600" y2="312" />
        </g>
        <path
          d="M50 240 C 110 190, 170 280, 230 220 C 290 165, 350 250, 410 205 C 470 160, 530 235, 570 200 L 600 190 L 600 328 L 50 328 Z"
          fill="#D3D3D3"
        />
        <path
          d="M50 240 C 110 190, 170 280, 230 220 C 290 165, 350 250, 410 205 C 470 160, 530 235, 570 200 L 600 190"
          fill="none"
          stroke="#ADADAD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="#D3D3D3" opacity="0.5">
          <circle cx="110" cy="190" r="3" />
          <circle cx="230" cy="220" r="3" />
          <circle cx="350" cy="250" r="3" />
          <circle cx="470" cy="160" r="3" />
          <circle cx="570" cy="200" r="3" />
        </g>
        <g fill="#D3D3D3">
          <rect x="70" y="314" width="24" height="8" rx="2" />
          <rect x="170" y="314" width="24" height="8" rx="2" />
          <rect x="270" y="314" width="24" height="8" rx="2" />
          <rect x="370" y="314" width="24" height="8" rx="2" />
          <rect x="470" y="314" width="24" height="8" rx="2" />
          <rect x="570" y="314" width="24" height="8" rx="2" />
        </g>
      </svg>
    </div>
  );
};

export default RevenueSkeleton;
