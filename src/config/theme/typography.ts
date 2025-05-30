// ** Theme Type Import
import { Theme } from "@mui/material/styles";

const typography = (theme: Theme) => {
  return {
    h1: {
      fontWeight: 600,
      fontSize: "64px",
      lineHeight: "76px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "28px",
        lineHeight: "36px"
      }
    },
    h2: {
      fontWeight: 600,
      fontSize: "36px",
      lineHeight: "44px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
        lineHeight: "28px"
      }
    },
    h3: {
      fontWeight: 600,
      fontSize: "28px",
      lineHeight: "36px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "18px",
        lineHeight: "24px"
      }
    },
    h4: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "28px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        lineHeight: "20px"
      }
    },
    h5: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "28px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        lineHeight: "20px"
      }
    },
    h6: {
      fontSize: "18px",
      lineHeight: "28px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        lineHeight: "24px"
      }
    },
    subtitle1: {
      color: theme.palette.text.primary
    },
    subtitle2: {
      color: theme.palette.text.primary
    },
    body1: {
      fontSize: "16px",
      lineHeight: "24px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
        lineHeight: "20px"
      }
    },
    body2: {
      fontSize: "14px",
      lineHeight: "24px",
      color: theme.palette.text.primary,

      [theme.breakpoints.down("md")]: {
        fontSize: "12px",
        lineHeight: "16px"
      }
    },
    button: {
      color: theme.palette.text.primary,
      textTransform: "none"
    },
    caption: {
      color: theme.palette.text.primary
    },
    overline: {
      color: theme.palette.text.primary
    }
  };
};

export default typography;
