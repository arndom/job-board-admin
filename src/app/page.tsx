"use client";

import { Suspense } from "react";

import { Authenticated } from "@refinedev/core";
import Layout from "@components/layout";
import { CardContent, Container, Grid2, Typography } from "@mui/material";
import DashboardStatCard from "@components/pages/dashboard/dashboard-stat-card";
import colors from "@config/theme/colors";
import DashboardApplicationsList from "@components/pages/dashboard/dashboard-recent-applications";
import { useDashboardStats } from "@hooks/use-dashboard-stats";

export default function IndexPage() {
  const { jobsCount, applicantsCount, applicationsCount } = useDashboardStats();

  return (
    <Suspense>
      <Authenticated key="home-page">
        <Layout>
          <Container maxWidth="xl">
            <Grid2 container spacing={4} sx={{ alignItems: "flex-start" }}>
              <Grid2
                container
                size={{
                  xs: 12,
                }}
                spacing={4}
              >
                <Grid2
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <DashboardStatCard
                    sx={{
                      borderBottomColor: colors["yellow"]["500"],
                    }}
                  >
                    <CardContent>
                      <Typography component="h4">
                        Welcome back, Admin
                      </Typography>
                    </CardContent>
                  </DashboardStatCard>
                </Grid2>
                <Grid2
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <DashboardStatCard
                    sx={{
                      borderBottomColor: colors["blue"]["500"],
                    }}
                  >
                    <CardContent>
                      <Typography component="h3">{jobsCount}</Typography>
                      <Typography>Total Jobs</Typography>
                    </CardContent>
                  </DashboardStatCard>
                </Grid2>
                <Grid2
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <DashboardStatCard
                    sx={{
                      borderBottomColor: colors["green"]["500"],
                    }}
                  >
                    <CardContent>
                      <Typography component="h3">
                        {applicationsCount}
                      </Typography>
                      <Typography>Total Applications</Typography>
                    </CardContent>
                  </DashboardStatCard>
                </Grid2>
                <Grid2
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <DashboardStatCard
                    sx={{
                      borderBottomColor: colors["pink"]["500"],
                    }}
                  >
                    <CardContent>
                      <Typography component="h3">{applicantsCount}</Typography>
                      <Typography>Total Candidates</Typography>
                    </CardContent>
                  </DashboardStatCard>
                </Grid2>
              </Grid2>

              <Grid2
                size={{
                  xs: 12,
                }}
              >
                <DashboardApplicationsList />
              </Grid2>
            </Grid2>
          </Container>
        </Layout>
      </Authenticated>
    </Suspense>
  );
}
