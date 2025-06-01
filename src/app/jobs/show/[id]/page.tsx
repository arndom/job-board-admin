"use client";

import { Breadcrumbs } from "@components/breadcrumbs";
import CardAvatarWithName from "@components/card-avatar-with-name";
import JobApplicationsList from "@components/pages/jobs/job-show-applications";
import JobShowDetails from "@components/pages/jobs/job-show-details";
import JobStatistics from "@components/pages/jobs/job-show-statistics";
import SingleElementForm from "@components/single-element-form";
import TabPanelContent from "@components/tab-panel-content";
import { InfoOutlined } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid2,
  Tab,
  Typography,
} from "@mui/material";
import { Authenticated, useShow } from "@refinedev/core";
import { formatTimeAgo } from "@utils";
import { countries } from "@utils/data";
import { Constants, Tables } from "@utils/supabase/database.types";
import Image from "next/image";
import { Suspense, useState } from "react";

type FormKeys = keyof Tables<"jobs">;

const tabs = [
  {
    label: "Details",
    value: "details",
  },
  {
    label: "Applications",
    value: "applications",
  },
];

export default function JobShow() {
  const { query, showId } = useShow<Tables<"jobs">>({});
  const { data, isFetching, isError } = query;
  const record = data?.data;

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
      <Authenticated key="job-show-page">
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
                    avatar={record.company_logo || ""}
                    name={record.company_name}
                  />

                  <CardContent>
                    <SingleElementForm
                      useFormProps={{
                        refineCoreProps: {
                          id: record.id,
                          resource: "jobs",
                        },
                        defaultValues: {
                          title: record.title,
                        },
                      }}
                      state={getActiveForm("title")}
                      itemProps={{
                        name: "title",
                        label: "Job Title",
                      }}
                      inputType="text"
                      view={<Typography>{record.title}</Typography>}
                      onClick={() => setActiveForm("title")}
                      onUpdate={() => setActiveForm(undefined)}
                      onCancel={() => setActiveForm(undefined)}
                    />

                    <SingleElementForm
                      useFormProps={{
                        refineCoreProps: {
                          id: record.id,
                          resource: "jobs",
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
                      options={Constants["public"]["Enums"]["job_status"].map(
                        (v) => ({
                          value: v,
                          label: v,
                        })
                      )}
                      onClick={() => setActiveForm("status")}
                      onUpdate={() => setActiveForm(undefined)}
                      onCancel={() => setActiveForm(undefined)}
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Job Location",
                      }}
                      inputType="text"
                      view={
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Image
                            src={`https://flagcdn.com/w20/${record.country?.toLowerCase()}.png`}
                            alt={record.country || ""}
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
                            {`${
                              countries.find(
                                (c) => c.code.toLowerCase() === record.country
                              )?.label
                            } | ${record.remote_type} ` || "N/A"}
                          </Typography>
                        </Box>
                      }
                      hideEdit
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Date Posted",
                      }}
                      inputType="text"
                      view={
                        <Typography variant="body2">
                          {record.created_at
                            ? formatTimeAgo(new Date(record.created_at))
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

              <Grid2 size={{ xs: 12 }}>
                <Card>
                  <CardHeader avatar={<InfoOutlined />} title="Statistics" />

                  <CardContent>
                    <Box sx={{ height: 300, overflowY: "auto" }}>
                      <JobStatistics id={String(showId)} />
                    </Box>
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
                          <JobShowDetails id={String(showId)} />
                        </TabPanelContent>
                      </TabPanel>

                      <TabPanel
                        value="applications"
                        sx={{
                          p: {
                            xs: 0,
                            sm: 1,
                          },
                        }}
                      >
                        <TabPanelContent>
                          <JobApplicationsList id={String(showId)} />
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
