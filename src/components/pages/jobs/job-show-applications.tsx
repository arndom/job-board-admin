"use client";

import {
  DataGrid,
} from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import React from "react";
import PageList from "@components/page-list";
import { useApplicationsColumns } from "@hooks/use-applications-columns";
import { useOne } from "@refinedev/core";
import { Tables } from "@utils/supabase/database.types";


interface Props {
  id: string
}

export default function JobApplicationsList(props: Props) {
  const { id } = props;
  const { data } = useOne<Tables<"jobs">>({
    resource: "jobs",
    id,
  });
  const record = data?.data

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
    filters: {
      permanent: [
        {
        field: "job_id",
        operator: "eq",
        value: id,
      },
      ]
    }
  });

  const columns = useApplicationsColumns()

  return (
    <PageList title={`${record?.title} role applications`}>
      <DataGrid {...dataGridProps} columns={columns} />
    </PageList>
  );
}
