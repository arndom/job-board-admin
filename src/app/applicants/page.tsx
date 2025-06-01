"use client";

import PageList from "@components/page-list";
import {
  alpha,
  Box,
  LinearProgress,
  ListItem,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import { ShowButton, useDataGrid } from "@refinedev/mui";
import { formatTimeAgo } from "@utils";
import { countries } from "@utils/data";
import { Tables } from "@utils/supabase/database.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ApplicantList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "last_modified",
          order: "desc",
        },
      ],
    },
  });

  const columns = React.useMemo<GridColDef<Tables<"applicants">>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        display: "flex",
        flex: 0.1,
        renderCell: function render({ row }) {
          return (
            <Box component={Link} href={`/applicants/show/${row.id}`}>
              <Typography variant="body2">{row.name}</Typography>
            </Box>
          );
        },
      },
      {
        field: "email",
        headerName: "Email",
        display: "flex",
        flex: 0.1,
      },
      {
        field: "country",
        headerName: "Location",
        display: "flex",
        flex: 0.1,
        renderCell: function render({ row }) {
          const country = countries.find(
            (c) => c.code.toLowerCase() === row.location
          );

          return (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Image
                src={`https://flagcdn.com/w20/${row.location?.toLowerCase()}.png`}
                alt={row.location || ""}
                width="20"
                height="20"
                style={{ width: 20, height: "auto" }}
              />

              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {country?.label || "N/A"}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "trust_level",
        headerName: "Trust Level",
        display: "flex",
        flex: 0.1,
        renderCell: function render({ row }) {
          return (
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={row.trust_level ?? 0}
                />
              </Box>

              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">
                  {Math.round(row.trust_level ?? 0)}%
                </Typography>
              </Box>
            </Box>
          );
        },
      },

      {
        field: "cv_url",
        type: "boolean",
        headerName: "CV",
        flex: 0.1,
        valueGetter: (_, row) => {
          if (!row.cv_url) return false;

          if (row.cv_url.startsWith("https://")) return true;

          return false;
        },
      },
      {
        field: "cover_letter_url",
        type: "boolean",
        headerName: "Cover letter",
        flex: 0.1,
        valueGetter: (_, row) => {
          if (!row.cover_letter_url) return false;

          if (row.cover_letter_url.startsWith("https://")) return true;

          return false;
        },
      },
      {
        field: "created_at",
        headerName: "Created on",
        display: "flex",
        renderCell: function render({ value }) {
          return (
            <Typography variant="body2">
              {value ? formatTimeAgo(value) : "NULL"}
            </Typography>
          );
        },
        flex: 0.1,
      },
      {
        field: "last_modified",
        headerName: "Last Modified",
        display: "flex",
        renderCell: function render({ value }) {
          return (
            <Typography variant="body2">
              {value ? formatTimeAgo(value) : "NULL"}
            </Typography>
          );
        },
        flex: 0.1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        sortable: false,
        display: "flex",
        flex: 0.1,
        getActions: function render({ row }) {
          return [
            <GridActionsCellItem
              key="view"
              label=""
              showInMenu
              component={() => (
                <ListItem>
                  <ShowButton size="small" title="View" recordItemId={row.id}>
                    View
                  </ShowButton>
                </ListItem>
              )}
            />,
          ];
        },
      },
    ],
    []
  );

  return (
    <PageList>
      <DataGrid {...dataGridProps} columns={columns} />
    </PageList>
  );
}
