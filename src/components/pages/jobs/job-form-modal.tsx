import { DialogWrapper } from "@components/dialog-wrapper";
import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { HttpError } from "@refinedev/core";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { countries } from "@utils/data";
import { Constants, TablesInsert } from "@utils/supabase/database.types";
import { Nullable } from "@utils/types";
import React from "react";
import { Controller } from "react-hook-form";

interface Props {
  form: UseModalFormReturnType<
    TablesInsert<"jobs">,
    HttpError,
    Nullable<TablesInsert<"jobs">>
  >;
}

const JobFormModal = (props: Props) => {
  const { form } = props;
  const {
    saveButtonProps,
    refineCore: { query },
    modal: { visible, close, title },
    register,
    control,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = form;

  return (
    <DialogWrapper
      visible={visible}
      close={close}
      title={title}
      onSave={saveButtonProps.onClick}
      saveButtonProps={{
        ...saveButtonProps,
      }}
      mode="add"
    >
      <Box component="form" autoComplete="off" sx={{ flexGrow: 1, mt: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("title", {
                required: "This field is required",
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
              label="Job title"
              margin="normal"
              placeholder="Site Reliability Engineer"
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name="remote_type"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Job type</InputLabel>
                  <Select {...field} value={field.value} label="Status">
                    {Constants["public"]["Enums"]["job_type_enum"].map(
                      (option, ind) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {option}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <TextField
              {...register("description", {
                required: "This field is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              label="Job description"
              multiline
              margin="normal"
              placeholder="Ensure uptime of critical systems..."
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name="country"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Country</InputLabel>
                  <Select {...field} value={field.value} label="Status">
                    {countries.map((option, ind) => (
                      <MenuItem
                        key={option.code}
                        value={option.code.toLowerCase()}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              control={control}
              name="remote_type"
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Job style</InputLabel>
                  <Select {...field} value={field.value} label="Status">
                    {Constants["public"]["Enums"]["remote_type_enum"].map(
                      (option, ind) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {option}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              {...register("salary", {
                required: "This field is required",
              })}
              error={!!errors.salary}
              helperText={errors.salary?.message}
              fullWidth
              label="Salary"
              margin="normal"
              placeholder="$130k–$180k"
            />
          </Grid2>
        </Grid2>
      </Box>
    </DialogWrapper>
  );
};

export default JobFormModal;
