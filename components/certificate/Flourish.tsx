interface FlourishProps {
  className: string;
}

export function Flourish({ className }: FlourishProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 88 V20 Q8 8 20 8 H88" strokeWidth="2" />
      <path d="M16 88 V28 Q16 16 28 16 H88" strokeWidth="1" />
      <path
        d="M24 24 C34 10 52 14 48 28 C45 38 32 34 36 26"
        strokeWidth="1.5"
      />
      <path
        d="M24 24 C10 34 14 52 28 48 C38 45 34 32 26 36"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
