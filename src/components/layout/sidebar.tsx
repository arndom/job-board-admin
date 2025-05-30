"use client";

import { FC } from "react";
import { RefineThemedLayoutV2SiderProps, ThemedSiderV2 } from "@refinedev/mui";
import { Box } from "@mui/material";

export const Sidebar: FC<RefineThemedLayoutV2SiderProps> = () => (
  <ThemedSiderV2
    render={({ items, logout }) => {
      return (
        <Box
          className="styled-sidebar-items"
          sx={{
            height: "100%",

            "& .MuiListItemText-root > .MuiTypography-root": {
              color: "currentColor",
            },

            "& .Mui-selected": {
              backgroundColor: (theme) =>
                `${theme.palette.primary.main} !important`,
              color: (theme) => theme.palette.common.white,
            },

            '[aria-label="Logout"]': {
              display: "absolute",
              bottom: 0
            },
          }}
        >
          {items}
          {logout}
        </Box>
      );
    }}
  />
);
