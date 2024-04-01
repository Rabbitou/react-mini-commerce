export default function CartIcon({
  fillColor,
  width,
  height,
}: {
  fillColor: string;
  width: number;
  height: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      style={{
        verticalAlign: "middle",
        overflow: "hidden",
      }}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="3"
      stroke={fillColor}
      fill="none"
    >
      <polyline points="4.62 9.96 15.34 9.96 21.71 37.85 49.69 37.85 56.17 16.35 16.67 15.79" />
      <path d="M51.73,44.35H21.67a3.21,3.21,0,0,1-3.28-3.28c0-3.22,3.32-3.22,3.32-3.22" />
      <circle cx="24.95" cy="51.61" r="3.53" />
      <circle cx="46.04" cy="51.61" r="3.53" />
    </svg>
  );
}
