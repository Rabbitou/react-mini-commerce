import { ReactNode } from "react";

export default function Button({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}) {
  return (
    <button
      type="submit"
      className={`hover:bg-opacity-80 transition-all ${style}`}
    >
      {children}
    </button>
  );
}
