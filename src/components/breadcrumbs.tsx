import { Box, Typography } from "@mui/material";
import { useBreadcrumb } from "@refinedev/core";
import Link from "next/link";

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        "& .MuiTypography-root:after": {
          content: "'>'",
          ml: 1,
        },
        "& .MuiTypography-root:last-child:after": {
          content: "''",
          ml: 0,
        },
      }}
    >
      {breadcrumbs.map(({ label, href, icon }) => (
        <Typography variant="subtitle2" key={label}>
          {icon}
          {href ? <Link href={href}>{label}</Link> : label}
        </Typography>
      ))}
    </Box>
  );
};
