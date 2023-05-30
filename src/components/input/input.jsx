import React from "react";
import { StyledInput } from "./input.style";
const InputComp = ({
  value,
  onChange,
  onBlur,
  fullWidth,
  type,
  error=false,
  size = "medium",
  variant = "standard",
}) => {
  return (
    <StyledInput
      value={value}
      fullWidth={fullWidth}
      onBlur={onBlur}
      error={error}
      onChange={onChange}
      variant={variant}
      size={size}
      type={type}
    />
  );
};

export default InputComp;
