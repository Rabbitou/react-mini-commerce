import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  children,
  style,
  onClick,
  disabled,
}: {
  children: ReactNode;
  style?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      className={`hover:bg-opacity-80 transition-all ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
