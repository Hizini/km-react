import React from "react";
import { StyledButton } from "./button.style";
const ButtonComp = ({ label, onClick, size = "medium", width, height }) => {
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
      size={size}
      width={width}
      height={height}
    >
      {label}
    </StyledButton>
  );
};

export default ButtonComp;
