import React, { ChangeEvent } from "react";

interface InputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input = ({ value, onChange, disabled, ...props }: InputProps) => {
  return (
    <input
      data-testid="input-text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Enter username"
      className="w-full border border-solid border-gray-300 text-gray-600 rounded-none p-4 bg-gray-100 focus-within:outline-none"
      {...props}
    />
  );
};

export default Input;
