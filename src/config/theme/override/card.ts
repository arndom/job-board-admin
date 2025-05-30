import { Theme } from "@mui/material";

const Card = (theme: Theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 5px 0px #091E4233"
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {},
        title: {
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "28px",

          [theme.breakpoints.down("md")]: {
            fontSize: "16px",
            lineHeight: "24px"
          }
        },
        action: {}
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {}
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {}
      }
    }
  };
};

export default Card;
