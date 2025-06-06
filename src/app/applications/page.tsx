"use client";

import {
  DataGrid,
} from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import React from "react";
import PageList from "@components/page-list";
import { useApplicationsColumns } from "@hooks/use-applications-columns";


export default function ApplicationsList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
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

  const columns = useApplicationsColumns()

  return (
    <PageList>
      <DataGrid {...dataGridProps} columns={columns} />
    </PageList>
  );
}
