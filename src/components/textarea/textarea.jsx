import React from "react";
import { StyledTextarea } from "./textarea.style";

const Textarea = ({ value, rows = 5, width }) => {
  return (
    <StyledTextarea height="100%" value={value} minRows={rows} maxRows={rows} width={width} />
  );
};

export default Textarea;
