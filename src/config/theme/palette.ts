import { PaletteOptions } from "@mui/material";
import colors from "./colors";

const palette: PaletteOptions = {
  common: {
    black: "#000",
    white: "#FFF"
  },

  mode: "light",

  primary: {
    main: colors.blue["500"],
    light: colors.blue["50"],
    dark: colors.blue["800"],
    contrastText: colors.grey["0"]
  },

  secondary: {
    main: colors.grey["500"],
    light: colors.grey["50"],
    dark: colors.grey["800"],
    contrastText: colors.grey["0"]
  },

  error: {
    main: colors.red["500"],
    light: colors.red["50"],
    dark: colors.red["800"],
    contrastText: colors.grey["0"]
  },

  warning: {
    main: colors.yellow["400"],
    light: colors.yellow["50"],
    dark: colors.yellow["800"],
    contrastText: colors.grey["0"]
  },

  info: {
    main: colors.blue["500"],
    light: colors.blue["50"],
    dark: colors.blue["800"],
    contrastText: colors.grey["0"]
  },

  success: {
    main: colors.green["500"],
    light: colors.green["50"],
    dark: colors.green["800"],
    contrastText: colors.grey["0"]
  },

  grey: {
    50: colors.grey["50"],
    100: colors.grey["100"],
    200: colors.grey["200"],
    300: colors.grey["300"],
    400: colors.grey["400"],
    500: colors.grey["500"],
    600: colors.grey["600"],
    700: colors.grey["700"],
    800: colors.grey["800"],
    900: colors.grey["800"],
    A100: colors.grey["100"],
    A200: colors.grey["200"],
    A400: colors.grey["400"],
    A700: colors.grey["700"]
  },

  text: {
    primary: colors.grey["800"]
  },

  background: {
    default: colors.grey["100"],
    paper: colors.grey["0"]
  }
};

export default palette;
