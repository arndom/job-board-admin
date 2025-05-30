"use client";
import { alpha, ThemeOptions } from "@mui/material/styles";

import type {} from "@mui/x-data-grid/themeAugmentation";
import palette from "./theme/palette";

import { Jost, Poppins } from "next/font/google";
import colors from "./theme/colors";

const jost = Jost({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap"
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap"
});

const themeConfig: ThemeOptions = {
  palette,
  typography: {
    fontFamily: jost.style.fontFamily
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // highlights
        "& ::selection": {
          background: alpha(colors.blue["500"], 0.5)
        },

        a: {
          textDecoration: "none",
          color: "inherit"
        },

        "input[type='password']": {
          fontFamily: poppins.style.fontFamily
        }
      }
    }
  }
};

export default themeConfig;
