import { Theme } from "@mui/material";
import colors from "../colors";

const InputLabel = (theme: Theme) => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          fontSize: "16px",
          fontWeight: 500,

          "&.Mui-focused": {
            color: theme.palette.grey["400"]
          },
          "&.Mui-error": {
            color: colors.red["500"]
          },
          "&.Mui-disabled": {
            color: theme.palette.grey["200"]
          }
        }
      }
    }
  };
};

export default InputLabel;
