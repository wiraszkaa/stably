import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 700,
        lg: 1000,
        xl: 1536,
      },
    },
  });

export default theme;
