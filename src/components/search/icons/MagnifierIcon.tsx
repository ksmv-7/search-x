export const MagnifierIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <svg 
    viewBox="0 0 48 48" 
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
  >
    <path 
      d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
    />
    <path 
      d="M0 0h48v48h-48z" 
      fill="none"
    />
  </svg>
  );
};