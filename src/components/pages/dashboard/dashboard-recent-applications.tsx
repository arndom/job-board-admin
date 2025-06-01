"use client";

import { DataGrid } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import React from "react";
import PageList from "@components/page-list";
import { useApplicationsColumns } from "@hooks/use-applications-columns";
import { Typography } from "@mui/material";

export default function DashboardApplicationsList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    resource: "applications",
    sorters: {
      initial: [
        {
          field: "last_modified",
          order: "desc",
        },
        {
          field: "match",
          order: "desc",
        },
      ],
    },
  });

  const columns = useApplicationsColumns();

  return (
    <PageList
      title={
        <Typography variant="body1" fontWeight={600}>
          Recent Job Applications
        </Typography>
      }
    >
      <DataGrid {...dataGridProps} columns={columns} />
    </PageList>
  );
}
