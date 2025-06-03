"use client";

import DataGridSelectChip from "@components/datagrid-select-chip";
import { Box, ListItem, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import { CreateButton, ShowButton, useDataGrid } from "@refinedev/mui";
import {
  Constants,
  Tables,
  TablesInsert,
} from "@utils/supabase/database.types";
import { countries, jobStatusColors, jobTypeColors } from "@utils/data";
import React from "react";
import Image from "next/image";
import { formatTimeAgo } from "@utils";
import { HttpError, useList } from "@refinedev/core";
import PageList from "@components/page-list";
import { useModalForm } from "@refinedev/react-hook-form";
import { Nullable } from "@utils/types";
import JobFormModal from "@components/pages/jobs/job-form-modal";
import Link from "next/link";

export default function JobList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "last_modified",
          order: "desc"
        }
      ]
    }
  });

  const createModalFormProps = useModalForm<
    TablesInsert<"jobs">,
    HttpError,
    Nullable<TablesInsert<"jobs">>
  >({
    refineCoreProps: { action: "create" },
    syncWithLocation: true,
    defaultValues: {
      company_name: "NotGoogle",
      company_logo: "https://logo.clearbit.com/google.com"
    }
  });
  const {
    modal: { show: showCreateModal },
  } = createModalFormProps;

  const { data: applicationsData, isLoading: applicationsDataIsLoading } =
    useList<Tables<"applications">>({
      resource: "applications",
    });

  const columns = React.useMemo<GridColDef<Tables<"jobs">>[]>(
    () => [
            {
        field: "title",
        headerName: "Job Title",
        display: "flex",
        flex: 0.2,
        renderCell: function render({ row }) {
          return (
            <Box component={Link} href={`/jobs/show/${row.id}`}>
              <Typography variant="body2">{row.title}</Typography>
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
        field: "job_type",
        headerName: "Type",
        display: "flex",
        flex: 0.15,
        renderCell: function render({ row }) {
          return (
            <DataGridSelectChip
              resource="jobs"
              id={row.id}
              field="job_type"
              options={Constants["public"]["Enums"]["job_type_enum"]}
              optionColors={jobTypeColors}
            />
          );
        },
      },
      {
        field: "country",
        headerName: "Job Location",
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
            applicationsData?.data?.filter((item) => item.job_id === row?.id)
              ?.length ?? 0
          );
        },
      },
      {
        field: "created_at",
        headerName: "Date Posted",
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
    [applicationsData, applicationsDataIsLoading]
  );

  return (
    <>
      <PageList
        headerButtons={() => (
          <CreateButton onClick={() => showCreateModal()}>
            Create Job
          </CreateButton>
        )}
      >
        <DataGrid {...dataGridProps} columns={columns} />
      </PageList>

      <JobFormModal form={createModalFormProps} />
    </>
  );
}
