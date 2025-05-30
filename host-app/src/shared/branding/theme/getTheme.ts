import { createTheme } from "@mui/material/styles";

export const getTheme = (primary: string, secondary: string) => {
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
    typography: {
      fontFamily: "'Helvetica Neue LT Std', sans-serif",
      fontSize: 14,
      h1: {
        fontSize: 84,
        fontWeight: 400,
        lineHeight: "101px",
        letterSpacing: "-0.09em",
      },
      h2: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "60px",
        lineHeight: "72px",
        letterSpacing: "-0.075em",
      },
      h3: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "48px",
        lineHeight: "58px",
        letterSpacing: "-0.06em",
      },
      h4: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "34px",
        lineHeight: "41px",
        letterSpacing: "-0.043em",
      },
      h5: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "24px",
        lineHeight: "29px",
        letterSpacing: "-0.03em",
      },
      h6: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "22px",
        letterSpacing: "-0.023em",
      },
      button: { fontSize: 14 },
      subtitle2: { fontSize: 14 },
      body1: { fontSize: 14},
    },
    components: {
      // MuiCssBaseline: {
      //   styleOverrides: `
      //   @font-face {
      //     font-family: 'Helvetica Neue LT Std';
      //     src: url('https://ebdevmicrofront.blob.core.windows.net/resources/HelveticaLTStd-Roman.woff2') format('woff2');
      //     font-display: swap;
      //   }
      //   `,
      // },
      MuiButton: {
        defaultProps: {
          style: {
            textTransform: "none",
            borderRadius: "0.8rem",
            fontWeight: "bold",
            padding: "0.6rem 1.1rem",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: primary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: primary,
              borderWidth: "2px",
            },
          },
        },
      },
    },
  });
};

