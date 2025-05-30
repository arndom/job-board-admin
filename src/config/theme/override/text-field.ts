import { Theme } from "@mui/material";
import colors from "../colors";

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root, .MuiFilledInput-root": {
            fontSize: "16px",
            lineHeight: "20px",
            backgroundColor: theme.palette.primary.light,
            borderRadius: "8px"
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderWidth: "0px !important"
            },
            "&:hover fieldset": {
              borderWidth: "0px !important"
            },
            "&.Mui-focused fieldset": {
              borderWidth: "0px !important"
            },

            // Remove Border For Filled variant
            "& .MuiFilledInput-root": {
              "&:before, &:after": {
                borderBottom: "none"
              }
            },

            // Remove Border For Standard variant
            "& .MuiInput-underline:before, & .MuiInput-underline:after": {
              borderBottom: "none"
            },

            "&.Mui-error": {
              backgroundColor: `${colors.red["50"]} !important`,
              "&.Mui-focused": {
                backgroundColor: colors.red["100"]
              }
            }
          },

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

export default TextField;
