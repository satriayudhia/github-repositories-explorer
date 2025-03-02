import React, { ReactElement } from "react";
import LoadingIndicator from "./loadingIndicator";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  text?: string | ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  type,
  text,
  onClick,
  disabled,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      data-testid="add-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-blue-500 hover:bg-blue-600 p-4 text-white mt-4 disabled:opacity-50 disabled:bg-gray-400 flex gap-2 items-center justify-center"
      {...props}
    >
      {loading && <LoadingIndicator />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
