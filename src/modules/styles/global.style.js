import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

//기본 스타일 리셋

const GlobalStyles = createGlobalStyle` 
    ${reset}

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }

    body {
        font-family: OpenSans;
        color: #252525;
        line-height: normal;
    }
`;

export default GlobalStyles;
