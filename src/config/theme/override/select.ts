import { Theme } from "@mui/material";
import colors from "../colors";

const Select = (theme: Theme) => {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "20px",
          backgroundColor: theme.palette.primary.light,
          borderRadius: "8px",

          // Remove border
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 0
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: 0
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 0
          },

          // For error state
          "&.Mui-error": {
            backgroundColor: colors.red["50"],
            "&.Mui-focused": {
              backgroundColor: colors.red["100"]
            }
          },

          // Hover and Focus background for Filled variant
          "& .MuiFilledInput-root": {
            "&.Mui-focused": {
              backgroundColor: theme.palette.primary.light
            },
            "&:hover": {
              backgroundColor: colors.blue["100"]
            },
            "&.Mui-error": {
              backgroundColor: colors.red["50"],
              "&.Mui-focused": {
                backgroundColor: colors.red["100"]
              }
            }
          },

          // Input styles
          "& .MuiInputBase-input": {
            "&.Mui-focused": {
              color: colors.blue["600"]
            }
          }
        },
        sizeSmall: {
          fontSize: "14px",
          lineHeight: "16px"
        },
        sizeLarge: {
          fontSize: "18px",
          lineHeight: "24px"
        }
      }
    }
  };
};

export default Select;
