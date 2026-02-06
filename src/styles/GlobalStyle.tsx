import { Global, css } from "@emotion/react";
import type { AppTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {
    _themeBrand?: never;
  }
}

export default function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
        :root {
          font-family: "Pretendard", "Noto Sans KR", "Apple SD Gothic Neo", "Segoe UI", sans-serif;
        }

        html,
        body,
        #root {
          height: 100%;
        }

        body {
          margin: 0;
          min-width: 320px;
          color: ${theme.color.text};
          background: ${theme.color.bg};
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        * {
          box-sizing: border-box;
        }

        button,
        input {
          font: inherit;
        }
      `}
    />
  );
}
