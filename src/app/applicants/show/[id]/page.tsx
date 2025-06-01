"use client";

import { Breadcrumbs } from "@components/breadcrumbs";
import CardAvatarWithName from "@components/card-avatar-with-name";
import ApplicantApplicationsList from "@components/pages/applicants/applicant-show-applications";
import ApplicantShowDetails from "@components/pages/applicants/applicant-show-details";
import SingleElementForm from "@components/single-element-form";
import TabPanelContent from "@components/tab-panel-content";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  Tab,
  Typography,
} from "@mui/material";
import { Authenticated, useShow } from "@refinedev/core";
import { formatTimeAgo } from "@utils";
import { countries } from "@utils/data";
import { Tables } from "@utils/supabase/database.types";
import Image from "next/image";
import { Suspense, useState } from "react";

type FormKeys = keyof Tables<"applicants">;

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

export default function ApplicantShow() {
  const { query, showId } = useShow<Tables<"applicants">>({});
  const { data, isFetching, isError } = query;
  const record = data?.data;

  const [tabValue, setTabValue] = useState(tabs[0].value);
  const handleTabChange = (event: any, newValue: string) => {
    const _tab = newValue;

    setTabValue(_tab);
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
                  <CardAvatarWithName avatar="" name={record.name} />

                  <CardContent>
                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Email",
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
                          <Typography>{record.email}</Typography>
                        </Box>
                      }
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Location",
                      }}
                      inputType="text"
                      view={
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Image
                            src={`https://flagcdn.com/w20/${record.location?.toLowerCase()}.png`}
                            alt={record.location || ""}
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
                            {countries.find(
                              (c) => c.code.toLowerCase() === record.location
                            )?.label || "N/A"}
                          </Typography>
                        </Box>
                      }
                      hideEdit
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Preferred Job",
                      }}
                      inputType="text"
                      view={
                        <Typography
                          variant="body2"
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {record.job_preferences
                            ? Object.values(record.job_preferences).join(" | ")
                            : ""}
                        </Typography>
                      }
                      hideEdit
                    />

                    <SingleElementForm
                      state="view"
                      itemProps={{
                        name: "",
                        label: "Created on",
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
                          {<ApplicantShowDetails id={String(showId)} />}
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
                          <ApplicantApplicationsList id={String(showId)} />
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
