import { Theme } from "@mui/material";

import MuiTextField from "./text-field";
import MuiSelect from "./select";
import MuiInputLabel from "./input-label";
import MuiCard from "./card";

const overrides = (theme: Theme) => {
  const textField = MuiTextField(theme);
  const select = MuiSelect(theme);
  const inputLabel = MuiInputLabel(theme);
  const card = MuiCard(theme);

  return Object.assign(
    card,
    textField,
    select,
    inputLabel
  );
};

export default overrides;
