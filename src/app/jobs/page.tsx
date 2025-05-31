"use client";

import DataGridSelectChip from "@components/datagrid-select-chip";
import { Avatar, Box, Link, ListItem, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { Constants, Tables } from "@utils/supabase/database.types";
import { countries, jobStatusColors } from "@utils/data";
import React from "react";
import Image from "next/image";
import { formatTimeAgo } from "@utils";
import { useMany } from "@refinedev/core";
import PageList from "@components/page-list";

export default function JobList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: applicationsData, isLoading: applicationsDataIsLoading } = useMany<Tables<"applications">>({
    resource: "applications",
    ids:
      dataGridProps?.rows
        ?.map((item) => item?.applications?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<Tables<"jobs">>[]>(
    () => [
      {
        field: "title",
        headerName: "Job title",
        display: "flex",
        flex: 0.2,
      },
      {
        field: "company_name",
        headerName: "Company",
        display: "flex",
        flex: 0.2,
        renderCell: function render({ row }) {
          return (
            <Box
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              component={Link}
              href={`/jobs/show/${row.id}`}
            >
              <Avatar src={row.company_logo!} sx={{ width: 26, height: 26 }} />
              <Typography variant="body2">{row.company_name}</Typography>
            </Box>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        display: "flex",
        flex: 0.15,
        renderCell: function render({ row }) {
          return (
            <DataGridSelectChip
              resource="jobs"
              id={row.id}
              field="status"
              options={Constants["public"]["Enums"]["job_status"]}
              optionColors={jobStatusColors}
            />
          );
        },
      },
      {
        field: "country",
        headerName: "Country",
        display: "flex",
        flex: 0.25,
        renderCell: function render({ row }) {
          const country = countries.find(
            (c) => c.code.toLowerCase() === row.country
          );

          return (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Image
                src={`https://flagcdn.com/w20/${row.country?.toLowerCase()}.png`}
                alt={row.country || ""}
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
                {`${country?.label} | ${row.remote_type} ` || "N/A"}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "applications",
        headerName: "Applications",
        display: "flex",
        flex: 0.15,
         renderCell: function render({ row }) {
          return applicationsDataIsLoading ? (
            <>Loading...</>
          ) : (
            applicationsData?.data?.filter((item) => item.job_id === row?.id)?.length ?? 0
          );
        },
      },
      {
        field: "created_at",
        headerName: "Date posted",
        display: "flex",
        renderCell: function render({ value }) {
          return <Typography variant="body2">{formatTimeAgo(value)}</Typography>;
        },
        flex: 0.2,
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
                  <ShowButton size="small" title="View" recordItemId={row.id} >View</ShowButton>
                </ListItem>
              )}
            />,
            <GridActionsCellItem
              key="edit"
              label=""
              showInMenu
              component={() => (
                <ListItem>
                  <EditButton size="small" title="Edit" recordItemId={row.id} />
                </ListItem>
              )}
            />,
          ];
        },
      },
    ],
    [applicationsData, applicationsDataIsLoading]
  );

  return (
    <PageList>
      <DataGrid {...dataGridProps} columns={columns} />
    </PageList>
  );
}
