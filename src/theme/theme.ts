import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    sidebar: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#02D076",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#10BFFC",
      contrastText: "#ffffff",
    },
    background: {
      sidebar: "#1A2638",
    },
  },
});

export default theme;
