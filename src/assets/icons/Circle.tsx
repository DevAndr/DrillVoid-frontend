export const CircleIcon = ({
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}) => {
  return (
    <svg
      className={className}
      height={size}
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="50" cy="50" fill={color} r="45" />
    </svg>
  );
};
