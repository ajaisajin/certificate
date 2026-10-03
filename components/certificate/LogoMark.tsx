interface LogoMarkProps {
  className: string;
  textClassName: string;
}

export function LogoMark({ className, textClassName }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 92 92"
      fill="none"
      stroke="currentColor"
      role="img"
      aria-label="Traversy Media logo"
    >
      <circle cx="46" cy="46" r="42" strokeWidth="2" />
      <circle cx="46" cy="46" r="36" strokeWidth="1" />
      <text
        className={textClassName}
        x="46"
        y="57"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
      >
        TM
      </text>
    </svg>
  );
}
