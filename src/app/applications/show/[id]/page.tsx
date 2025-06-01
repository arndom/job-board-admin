"use client";

import { Breadcrumbs } from "@components/breadcrumbs";
import CardAvatarWithName from "@components/card-avatar-with-name";
import ApplicationShowDetails from "@components/pages/applications/application-show-details";
import SingleElementForm from "@components/single-element-form";
import TabPanelContent from "@components/tab-panel-content";
import { OpenInNewOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, CardContent, Container, Grid2, IconButton, Tab, Typography } from "@mui/material";
import { Authenticated, useOne, useShow } from "@refinedev/core";
import { formatTimeAgo } from "@utils";
import { Constants, Tables } from "@utils/supabase/database.types";
import Link from "next/link";
import { Suspense, useState } from "react";

type FormKeys = keyof Tables<"applications">;

const tabs = [
  {
    label: "Details",
    value: "details",
  },
  {
    label: "Communications",
    value: "comms",
  },

];

export default function ApplicationShow() {
  const { query, showId } = useShow<Tables<"applications">>({});
  const { data, isFetching, isError } = query;
  const record = data?.data;

    const { data: applicantData, isLoading: applicantDataIsLoading } = useOne<
    Tables<"applicants">
  >({
    resource: "applicants",
    id: record?.applicant_id ?? undefined
  });

      const { data: jobData, isLoading: jobDataIsLoading } = useOne<
    Tables<"jobs">
  >({
    resource: "jobs",
    id: record?.job_id ?? undefined
  });

  const [activeForm, setActiveForm] = useState<FormKeys>();
  const [tabValue, setTabValue] = useState(tabs[0].value);

  const handleTabChange = (event: any, newValue: string) => {
    const _tab = newValue;

    setTabValue(_tab);
  };

  const getActiveForm = (key: FormKeys) => {
    if (activeForm === key) {
      return "form";
    }

    if (record) {
      let value = record[key];
      if (typeof value === "number") value = String(value);

      if (!value) {
        return "empty";
      }
    }

    return "view";
  };


    if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  if (!record) {
    return <div>resource item not found</div>;
  }

  return (
    <Suspense>
      <Authenticated key="application-show-page">
        <Container maxWidth="xl">
          <Grid2 container spacing={4} sx={{ alignItems: "flex-start" }}>
            <Grid2
              container
              size={{
                xs: 12,
                md: 4,
                xl: 3,
              }}
              spacing={4}
            >
              <Grid2 size={{ xs: 12 }}>
                <Card>
                  <CardAvatarWithName
                    avatar=""
                    name={
                      applicantDataIsLoading
                        ? "..."
                        : applicantData
                        ? applicantData.data.name
                        : "N/A"
                    }
                  />

                  <Box sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center"
                  }}>
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/applicants/show/${
                        applicantDataIsLoading ? "..." : applicantData ? applicantData.data.id : "#"
                      }`}
                      target="__blank"
                    >
                      <OpenInNewOutlined fontSize="small" />
                    </IconButton>
                  </Box>

                  <CardContent>
                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "title",
                        label: "Job Title",
                      }}
                      inputType="text"
                      hideEdit
                      view={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>
                            {jobDataIsLoading
                              ? "..."
                              : jobData
                              ? jobData.data.title
                              : "N/A"}
                          </Typography>

                          <IconButton
                            size="small"
                            component={Link}
                            href={`/jobs/show/${
                              jobDataIsLoading
                                ? "..."
                                : jobData
                                ? jobData.data.id
                                : "#"
                            }`}
                            target="__blank"
                            sx={{
                              mr: "-0.8rem",
                            }}
                          >
                            <OpenInNewOutlined fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                    />

                    <SingleElementForm
                      useFormProps={{
                        refineCoreProps: {
                          id: record.id,
                          resource: "applications",
                        },
                        defaultValues: {
                          status: record.status,
                        },
                      }}
                      state={getActiveForm("status")}
                      itemProps={{
                        name: "status",
                        label: "Status",
                      }}
                      view={
                        <Typography sx={{ textTransform: "capitalize" }}>
                          {record.status}
                        </Typography>
                      }
                      inputType="select"
                      options={Constants["public"]["Enums"][
                        "application_status"
                      ].map((v) => ({
                        value: v,
                        label: v,
                      }))}
                      onClick={() => setActiveForm("status")}
                      onUpdate={() => setActiveForm(undefined)}
                      onCancel={() => setActiveForm(undefined)}
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Seniority",
                      }}
                      inputType="text"
                      view={
                        <Typography
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {record.seniority_level}
                        </Typography>
                      }
                      hideEdit
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Applied on",
                      }}
                      inputType="text"
                      view={
                        <Typography variant="body2">
                          {record.date_applied
                            ? formatTimeAgo(new Date(record.date_applied))
                            : "NULL"}
                        </Typography>
                      }
                      hideEdit
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Last Modified",
                      }}
                      inputType="text"
                      view={
                        <Typography variant="body2">
                          {record.last_modified
                            ? formatTimeAgo(new Date(record.last_modified))
                            : "NULL"}
                        </Typography>
                      }
                      hideEdit
                    />
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 8, xl: 9 }}>
              <TabContext value={tabValue}>
                <Card>
                  <CardContent>
                    <Breadcrumbs />

                    <TabList
                      aria-label=""
                      onChange={handleTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      allowScrollButtonsMobile
                      sx={{ maxWidth: "inherit" }}
                    >
                      {tabs.map((tab) => (
                        <Tab
                          key={tab.label}
                          label={tab.label}
                          value={tab.value}
                          tabIndex={-1}
                        />
                      ))}
                    </TabList>

                    <Box>
                      <TabPanel
                        value="details"
                        sx={{
                          p: {
                            xs: 0,
                            sm: 1,
                          },
                        }}
                      >
                        <TabPanelContent>
                          <ApplicationShowDetails id={String(showId)} />
                        </TabPanelContent>
                      </TabPanel>
                    </Box>
                  </CardContent>
                </Card>
              </TabContext>
            </Grid2>
          </Grid2>
        </Container>
      </Authenticated>
    </Suspense>
  );
}
