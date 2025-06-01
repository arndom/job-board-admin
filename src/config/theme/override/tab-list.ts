import { Theme } from "@mui/material/styles";
import colors from "../colors";

const TabList = (theme: Theme) => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid",
          borderColor: theme.palette.grey["400"],
          minHeight: 0,
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(3),
          marginRight: theme.spacing(3),

          "& .MuiTab-root": {
            textTransform: "none",
            paddingTop: 0,
            paddingBottom: 0,
            minWidth: 0,
            minHeight: 0,

            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "28px",
            color: theme.palette.grey["600"],

            border: "1px solid",
            borderColor: theme.palette.grey["400"],
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            borderBottom: "none",

            "&.Mui-selected": {
              color: colors.blue["600"]
            },

            "&.Mui-disabled": {
              color: theme.palette.secondary.light
            }
          },

          [theme.breakpoints.down("md")]: {
            "& .MuiTab-root": {
              fontSize: "16px",
              lineHeight: "20px"
            }
          }
        },

        indicator: {
          backgroundColor: "transparent"
        },

        flexContainer: {
          gap: theme.spacing(2)
        }
      }
    }
  };
};

export default TabList;
