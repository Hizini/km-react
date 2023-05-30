import styled from "styled-components";

import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
  width: ${({ width }) => (width ?? "")};
  height: ${({ height }) => (height ?? "")};
`;
