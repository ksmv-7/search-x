export const SearchHistoryIcon: React.FC<{ width?: number; height?: number; className?: string; }> = ({
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
    <path d="M0 0h48v48h-48z" fill="none" />
    <path
      d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z"
      opacity={0.9}
    />
    </svg>
  )
};