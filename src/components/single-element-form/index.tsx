import type { UseFormProps } from "@refinedev/react-hook-form";
import { useForm } from "@refinedev/react-hook-form";

import { CSSProperties, KeyboardEvent, ReactNode, useState } from "react";
import styles from "./index.module.css";
import {
  EditOutlined,
  InfoOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { SaveButton } from "@refinedev/mui";
import { Controller } from "react-hook-form";
import ReactQuillEditor from "../react-quill-editor";

interface SelectOptionT {
  value: string;
  label: string;
}

interface BaseProps<T> {
  icon?: ReactNode;
  itemProps?: {
    name: string;
    label: string;
  };
  extra?: ReactNode;
  view?: ReactNode;
  state?: "empty" | "form" | "view";
  onUpdate?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
  loading?: boolean;
  style?: CSSProperties;
  useFormProps?: UseFormProps;
  hideEdit?: boolean;
  inputType?:
    | "text"
    | "number"
    | "textarea"
    | "enum"
    | "select"
    | "password"
    | "wysiwyg";
  options?: SelectOptionT[];
}

interface TextInputProps<T> extends BaseProps<T> {
  inputType?: "text" | "number" | "textarea" | "password";
  options?: never;
}

interface EnumInputProps<T> extends BaseProps<T> {
  inputType: "enum";
  options?: never;
}

interface SelectInputProps<T> extends BaseProps<T> {
  inputType: "select";
  options: SelectOptionT[];
}

interface WYSIWYGInputProps<T> extends BaseProps<T> {
  inputType: "wysiwyg";
  options?: never;
}

type Props<T> = TextInputProps<T> | SelectInputProps<T> | WYSIWYGInputProps<T>;

const SingleElementForm = <T extends object>(props: Props<T>) => {
  const {
    state = "view",
    view,
    icon,
    itemProps,
    onClick,
    onUpdate,
    onCancel,
    loading,
    style,
    extra,
    useFormProps,
    hideEdit,
    inputType = "text",
    options,
  } = props;

  const {
    saveButtonProps,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    ...useFormProps,
    refineCoreProps: {
      action: "edit",
      redirect: false,
      autoSave: {
        enabled: false,
      },

      queryOptions: {
        enabled: false,
      },
      onMutationSuccess() {
        onUpdate?.();
      },
      mutationMode: "optimistic",
      ...useFormProps?.refineCoreProps,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div>
      <Box
        className={styles.container}
        sx={{
          ...style,
          borderBottom: (theme) => `1px solid ${theme.palette.grey["400"]}`,
        }}
      >
        <div className={styles.icon}>
          {icon ?? <InfoOutlined fontSize="small" />}
        </div>
        <div className={styles.content}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={styles.input}>
                {state !== "form" && (
                  <Typography
                    variant="body2"
                    fontWeight={200}
                    className={styles.label}
                  >
                    {itemProps?.label}
                  </Typography>
                )}

                {loading && (
                  <Skeleton variant="rectangular" className={styles.skeleton} />
                )}

                {state === "form" && itemProps && !loading && (
                  <div className={styles.formItem}>
                    <Controller
                      control={control}
                      {...itemProps}
                      render={({ field }) => {
                        if (inputType === "select" && options) {
                          return (
                            <FormControl fullWidth>
                              <InputLabel>{itemProps.label}</InputLabel>
                              <Select {...field} label={itemProps.label}>
                                {options.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    sx={{ textTransform: "capitalize" }}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          );
                        }

                        if (inputType === "wysiwyg") {
                          return (
                            <Box>
                              <ReactQuillEditor
                                value={field.value ? String(field.value) : ""} // null check
                                onChange={(value) =>
                                  setValue(itemProps.name, value)
                                }
                                placeholder="Write here..."
                              />
                              {errors[itemProps.name] && (
                                <Typography color="error" component="span">
                                  {errors[itemProps.name]?.message as any}
                                </Typography>
                              )}
                            </Box>
                          );
                        }

                        const isPasswordField = inputType === "password";

                        // text | textarea | number | password
                        return (
                          <TextField
                            {...field}
                            type={
                              isPasswordField && !showPassword
                                ? "password"
                                : inputType === "number"
                                ? "number"
                                : "text"
                            }
                            {...(inputType === "textarea" && {
                              multiline: true,
                            })}
                            label={itemProps.label}
                            fullWidth
                            error={!!errors[itemProps.name]}
                            helperText={errors[itemProps.name]?.message as any} // temp solution to type error
                            autoComplete={
                              inputType === "password" ? "new-password" : "off"
                            }
                            onKeyDown={handleKeyDown}
                            InputProps={{
                              endAdornment: isPasswordField ? (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ) : null,
                            }}
                          />
                        );
                      }}
                    />

                    {inputType === "password" && (
                      <TextField
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirm Password"
                        fullWidth
                        error={
                          watch("password") &&
                          confirmPassword !== watch("password")
                        }
                        helperText={
                          watch("password") &&
                          confirmPassword !== watch("password")
                            ? "Passwords do not match"
                            : ""
                        }
                        sx={{ mt: 2 }}
                        autoComplete="new-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}

                    {extra}
                  </div>
                )}

                {!hideEdit && state === "empty" && !loading && (
                  <Button
                    onClick={onClick}
                    component="a"
                    size="small"
                    style={{ padding: 0 }}
                  >
                    Add {itemProps?.label}
                  </Button>
                )}

                {state === "view" && view}
              </div>
            </Grid>
            <Grid item xs={12}>
              {state === "form" && (
                <div className={styles.buttons}>
                  <Button onClick={() => onCancel?.()}>Cancel</Button>
                  <SaveButton {...saveButtonProps} />
                </div>
              )}
            </Grid>
          </Grid>
        </div>

        {!hideEdit && state === "view" && (
          <div className={styles.actions}>
            <IconButton size="small" onClick={onClick}>
              <EditOutlined fontSize="small" />
            </IconButton>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SingleElementForm;
