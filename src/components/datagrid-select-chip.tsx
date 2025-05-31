import colors from "@config/theme/colors";
import { Chip, darken, Menu, MenuItem, styled } from "@mui/material";
import { useOne, useUpdate } from "@refinedev/core";
import React, { MouseEvent, useState } from "react";

const StyledChip = styled(Chip)(({}) => ({
  "& .MuiChip-label": {
    textTransform: "capitalize"
  }
}));

interface Props<T extends readonly string[]> {
  resource: string;
  id: string;
  field: string;
  options: T;
  optionColors?: Record<T[number], string>;
  readonly?: boolean;
}

/**
 *  @description Chip with menu used for changing enum fields like status.
 * Intended for use in Mui-DataGrid `list` routes.
 *
 * @example
 * // example enum field
 * status = "0"
 */
const DataGridSelectChip = <T extends readonly string[]>(props: Props<T>) => {
  const {
    resource,
    id,
    field,
    options,
    readonly = false,
    optionColors
  } = props;

  const { data, isLoading, isError } = useOne({
    resource,
    id
  });

  const { mutate } = useUpdate({
    resource
  });

  const dataObject = data?.data;
  const getCurrentValue = () => (dataObject ? dataObject[field] : null);
  const currentValue = getCurrentValue();

  const getOptionValue = () => {
    const value = options.find(
      (option) => option === String(currentValue)
    );

    if (!value) return null;

    return value;
  };
  const optionValue = getOptionValue();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const handleCloseMenu = () => setMenuAnchor(null);
  const handleOpenMenu = (e: MouseEvent<HTMLDivElement>) => {
    if (readonly) return;

    setMenuAnchor(e.currentTarget);
  };

  const handleOptionChange = (newValue: string) => {
    mutate({
      id,
      values: {
        [field]: newValue
      }
    });
    handleCloseMenu();
  };

  const getChipBackgroundColor = (colorKey: string) => {
    const defaultColor = "grey[500]";
    const [baseColor, shade] = colorKey.split(".");

    return colors[baseColor]?.[shade] || defaultColor;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!currentValue) {
    return <div>Field: {field} does not exist</div>;
  }

  return (
    <>
      <StyledChip
        label={optionValue}
        onClick={handleOpenMenu}
        sx={{
          ...(optionColors &&
            optionValue && {
              background: getChipBackgroundColor(
                optionColors[optionValue as T[number]]
              ),
              color: (theme) => theme.palette.common.white,

              "&:hover": {
                background: darken(
                  getChipBackgroundColor(optionColors[optionValue as T[number]]),
                  0.05
                )
              }
            })
        }}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              handleOptionChange(option);
            }}
            sx={{
              p: 1,
              height: "fit-content",
              minHeight: "fit-content"
            }}
          >
            <StyledChip
              label={option}
              sx={{
                ...(optionColors && {
                  background: getChipBackgroundColor(
                    optionColors[option as T[number]]
                  ),
                  color: (theme) => theme.palette.common.white,
                  borderRadius: "12px"
                })
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DataGridSelectChip;
