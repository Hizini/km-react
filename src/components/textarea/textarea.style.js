import styled from "@emotion/styled";

import { TextareaAutosize } from "@mui/material";

export const StyledTextarea = styled(TextareaAutosize)`
    width: ${({ width }) => width ?? ""};
    height: ${({ height }) => height ?? ""};
    resize: none;
    border-color: rgba(0, 0, 0, 0.23);
    padding: 16.5px 14px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
`;
