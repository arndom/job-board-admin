import DataGridSelectChip from "@components/datagrid-select-chip";
import { Typography, Box, LinearProgress, ListItem } from "@mui/material";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useList, useResourceParams } from "@refinedev/core";
import { ShowButton } from "@refinedev/mui";
import { formatTimeAgo } from "@utils";
import { applicationStatusColors } from "@utils/data";
import { Tables, Constants } from "@utils/supabase/database.types";
import Link from "next/link";
import React from "react";

export const useApplicationsColumns = () => {
  const { resource } = useResourceParams();

  const { data: applicantsData, isLoading: applicantsDataIsLoading } = useList<
    Tables<"applicants">
  >({
    resource: "applicants",
  });

  const { data: jobsData, isLoading: jobsDataIsLoading } = useList<
    Tables<"jobs">
  >({
    resource: "jobs",
  });

  const column = [
    {
      field: "job",
      headerName: "Job",
      display: "flex",
      flex: 0.15,
      renderCell: function render({ row }) {
        const job = jobsData?.data.find((v) => v.id === row.job_id);

        if (jobsDataIsLoading)
          return <Typography variant="body2">Loading...</Typography>;

        return (
          <Box component={Link} href={job ? `/jobs/show/${job.id}` : ""}>
            <Typography variant="body2">{job?.title ?? "N/A"}</Typography>
          </Box>
        );
      },
    },
    {
      field: "applicant",
      headerName: "Candidate",
      display: "flex",
      flex: 0.15,
      renderCell: function render({ row }) {
        const applicant = applicantsData?.data.find(
          (v) => v.id === row.applicant_id
        );

        if (applicantsDataIsLoading)
          return <Typography variant="body2">Loading...</Typography>;

        return (
          <Box
            component={Link}
            href={applicant ? `/applicants/show/${applicant.id}` : ""}
          >
            <Typography variant="body2">{applicant?.name ?? "N/A"}</Typography>
          </Box>
        );
      },
    },
    {
      field: "match",
      headerName: "Job Match",
      display: "flex",
      flex: 0.15,
      renderCell: function render({ row }) {
        return (
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" value={row.match ?? 0} />
            </Box>

            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2">
                {Math.round(row.match ?? 0)}%
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      display: "flex",
      flex: 0.125,
      renderCell: function render({ row }) {
        return (
          <DataGridSelectChip
            resource="applications"
            id={row.id}
            field="status"
            options={Constants["public"]["Enums"]["application_status"]}
            optionColors={applicationStatusColors}
          />
        );
      },
    },
    {
      field: "has_cv",
      type: "boolean",
      headerName: "CV",
      flex: 0.1,
    },
    {
      field: "has_cover_letter",
      type: "boolean",
      headerName: "Cover letter",
      flex: 0.1,
    },
    {
      field: "date_applied",
      headerName: "Applied on",
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
            key="view-application"
            label=""
            showInMenu
            component={() => (
              <ListItem>
                <ShowButton
                  size="small"
                  title="View Application"
                  resource="applications"
                  recordItemId={row.id}
                >
                  View Application
                </ShowButton>
              </ListItem>
            )}
          />,
          <GridActionsCellItem
            key="view-applicant"
            label=""
            showInMenu
            component={() => (
              <ListItem>
                <ShowButton
                  size="small"
                  title="View Candidate"
                  resource="applicants"
                  recordItemId={row.applicant_id ?? ""}
                >
                  View Candidate
                </ShowButton>
              </ListItem>
            )}
          />,
        ];
      },
    },
  ] as GridColDef<Tables<"applications">>[];

  const filteredColumns = column.filter((c) => {
    if (resource?.name === "jobs" && c.field === "job") return false;
    if (resource?.name === "applicants" && c.field === "applicant") return false;

    return true;
  })

    const columns = React.useMemo(
      () => filteredColumns,
      [filteredColumns]
    );

  return columns;
};
